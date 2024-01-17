export function extractContentInBraces(text = '') {
  const regex = /\{([\s\S]*?)\}/;
  const match = text.match(regex);

  if (match && match[1]) {
    return match[1].trim();
  } else {
    return null;
  }
}
export function extractContentBeforeClass(text = '') {
  const regex = /class([\s\S]*)/;
  const match = text.split('class');

  if (match && match[0]) {
    return match[0];
  } else {
    return null;
  }
}
export function convertToCustomFormat(url) {
  const parts = url.replace(/{.*}/, '').split('/');

  const camelCaseString = parts
    .map((part) => {
      const subParts = part.split('-');
      const camelCaseSubString = subParts
        .map((subPart) => {
          return subPart.charAt(0).toUpperCase() + subPart.slice(1);
        })
        .join('');

      return camelCaseSubString;
    })
    .join('');

  return camelCaseString;
}

export function generateInterfaceName(name) {
  if (typeof name === 'string') {
    const arr = name?.split('/');
    return arr[arr.length - 1];
  } else {
    return null;
  }
}
function replaceTypes(prop) {
  let types = {
    integer: 'number',
  };
  if (types.hasOwnProperty(prop)) {
    return types[prop];
  } else {
    return prop;
  }
}
export function findRequestBodyType(obj) {
  console.log(obj);
  if (obj?.content['application/json']?.schema?.items?.$ref) {
    console.log(obj?.content['application/json']?.schema?.items.$ref);
    return generateInterfaceName(obj.content['application/json']?.schema?.items.$ref) + '[]';
  } else if (obj?.content['application/json']?.schema?.$ref) {
    return generateInterfaceName(obj.content['application/json']?.schema?.$ref);
  } else if (obj?.content['application/json']?.schema?.type) {
    return replaceTypes(obj?.content['application/json']?.schema?.type);
  } else {
    null;
  }
}
