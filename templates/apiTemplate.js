import fs from 'fs';

const genApiClass = (name, arr) => {
  return `
import ApiConnector from '../restClient';
class ${name} {
      ${arr
        .map((el) =>
          generateController(el.name, el.method, el.url, el?.parameters, el?.requestBody),
        )
        .join('\n')}
             }
export default ${name};
    `;
};

const generateController = (name, method, url, parameters = [], requestBody) => {
  // console.log(`element is`, el);
  const link = '`' + `${url.replace('{', '${')}` + '`';
  const params = parameters?.map((el) => el.name.replace('-', '')).join(',');

  return `static ${name}(${params}${params && requestBody?.content ? ',' : ''}${
    requestBody?.content ? 'data' : ''
  }) {
      return ApiConnector.${method}(${link}${requestBody?.content ? ',' + 'data' : ''});
    }
    `;
};
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).replace('-', '');
}
export const generateApi = (paths) => {
  const listOfClass = new Set();
  for (let key in paths) {
    paths[key]?.post?.tags[0] && listOfClass.add(paths[key]?.post?.tags[0]);
    paths[key]?.get?.tags[0] && listOfClass.add(paths[key]?.get?.tags[0]);
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
        });
      }
      if (paths[key]?.get?.tags[0] === array[i]) {
        cont.push({
          ...paths[key],
          method: 'getAxios',
          url: key,
          name: paths[key]?.get?.operationId,
          parameters: paths[key]?.get?.parameters,
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
