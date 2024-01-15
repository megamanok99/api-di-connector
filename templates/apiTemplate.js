import fs from 'fs';

const genApiClass = (name, arr) => {
  return `
import ApiConnector from '../restClient';
class ${name} {
      ${arr
        .map((el) =>
          generateController(el.name, el.method, el.url, el?.parameters, el?.requestBody, el),
        )
        .join('\n')}
             }
export default ${name};
    `;
};

const generateController = (name, method, url, parameters = [], requestBody, elem) => {
  const queryParams =
    parameters
      ?.filter((elem) => elem.in === 'query')
      ?.map((el) => el.name + '=' + '${' + el.name + '}') || [];
  const link =
    '`' +
    `${url.replace('{', '${')}` +
    (queryParams.length > 0 ? '?' + queryParams.join('&') : '') +
    '`';
  const params = parameters
    ?.filter((elem) => elem.in !== 'header')
    ?.map((el) => el.name.replace('-', ''))
    .join(',');

  return `
  /**
 * @description  ${elem?.summary}
 * ${parameters
   ?.map(
     (el) =>
       '@params ' +
       '{' +
       el.name +
       '}' +
       ' обязательность - ' +
       el?.required +
       ' тип данных - ' +
       el?.schema?.type,
   )
   .join('\n')}
 */
  
  static ${removeAfterUnderscore(name)}(${params}${params && requestBody?.content ? ',' : ''}${
    requestBody?.content ? 'data' : ''
  }) {
      return ApiConnector.${method}(${link}${requestBody?.content ? ',' + 'data' : ''});
    }
    `;
};

function removeAfterUnderscore(inputString) {
  const underscoreIndex = inputString.indexOf('_');

  if (underscoreIndex !== -1) {
    return inputString.slice(0, underscoreIndex);
  } else {
    return inputString;
  }
}
function capitalizeFirstLetter(string) {
  return string
    ?.split('-')
    ?.map((word, index) => word.charAt(0).toUpperCase() + word.slice(1))
    ?.join('');
}

export const generateApi = (paths) => {
  const listOfClass = new Set();
  for (let key in paths) {
    paths[key]?.post?.tags[0] && listOfClass.add(paths[key]?.post?.tags[0]);
    paths[key]?.get?.tags[0] && listOfClass.add(paths[key]?.get?.tags[0]);
    paths[key]?.patch?.tags[0] && listOfClass.add(paths[key]?.patch?.tags[0]);
    paths[key]?.delete?.tags[0] && listOfClass.add(paths[key]?.delete?.tags[0]);
  }

  const array = Array.from(listOfClass);

  for (let i = 0; i < array.length; i++) {
    let cont = [];
    for (let key in paths) {
      if (paths[key]?.post?.tags[0] === array[i]) {
        cont.push({
          ...paths[key],
          method: 'postAxios',
          url: key,
          name: paths[key]?.post?.operationId,
          requestBody: paths[key]?.post?.requestBody,
          parameters: paths[key]?.post?.parameters,
          summary: paths[key]?.post?.summary,
        });
      }
      if (paths[key]?.get?.tags[0] === array[i]) {
        cont.push({
          ...paths[key],
          method: 'getAxios',
          url: key,
          name: paths[key]?.get?.operationId,
          parameters: paths[key]?.get?.parameters,
          summary: paths[key]?.get?.summary,
        });
      }

      if (paths[key]?.delete?.tags[0] === array[i]) {
        cont.push({
          ...paths[key],
          method: 'deleteAxios',
          url: key,
          name: paths[key]?.delete?.operationId,
          parameters: paths[key]?.delete?.parameters,
          summary: paths[key]?.delete?.summary,
        });
      }
      if (paths[key]?.patch?.tags[0] === array[i]) {
        cont.push({
          ...paths[key],
          method: 'patchAxios',
          url: key,
          name: paths[key]?.patch?.operationId,
          parameters: paths[key]?.patch?.parameters,
          summary: paths[key]?.patch?.summary,
        });
      }
    }

    // console.log(`we find`, cont);

    fs.writeFile(
      `./service/apiService/api/Api${capitalizeFirstLetter(array[i])}.js`,
      genApiClass(`Api${capitalizeFirstLetter(array[i])}`, cont),
      (err) => {
        if (err) {
          console.log(err);
        }
        console.log('Api classes generated successfully ');
      },
    );
  }
};
