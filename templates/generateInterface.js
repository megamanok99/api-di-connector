import fs from 'fs';
export function generateInterfaces(obj) {
  let result = '';
  let types = {
    integer: 'number',
    array: 'string[]',
  };
  function processEntity(entityName, entity) {
    result += `export interface ${entityName} {\n`;
    if (entity.type === 'object' && entity.properties) {
      for (const prop in entity.properties) {
        const propType = processProperty(prop, entity.properties[prop]);
        // console.log(`her`, prop, 'valye', propType);
        result += `    ${prop}: ${replaceTypes(propType)};\n`;
      }
    }
    result += '}\n\n';
  }
  function replaceTypes(prop) {
    if (types.hasOwnProperty(prop)) {
      return types[prop];
    } else {
      return prop;
    }
  }

  function processProperty(propName, prop) {
    if (prop.type === 'object' && prop.properties) {
      const nestedEntityName = propName.charAt(0).toUpperCase() + propName.slice(1) + 'Entity';
      processEntity(nestedEntityName, prop);
      return nestedEntityName;
    } else if (prop.type === 'array' && prop.items && prop.items.$ref) {
      const nestedEntityName = prop.items.$ref.split('/').pop();
      return `${nestedEntityName}[]`;
    } else {
      return prop.type;
    }
  }

  for (const entityName in obj) {
    // console.log(`her`, entityName, 'value:', obj[entityName]);
    processEntity(entityName, obj[entityName]);
  }

  return fs.writeFile(`./service/apiService/intrefaces.ts`, result, (err) => {
    if (err) {
      // console.log(err);
    }
    // console.log('interface generated successfully ');
  });
}
