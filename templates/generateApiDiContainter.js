import fs from 'fs';
import { extractContentBeforeClass, extractContentInBraces } from '../tools.js';
import { capitalizeFirstLetter } from './apiTemplate.js';

export function processClass(currentClass, lang) {
  try {
    const data = fs.readFileSync(`./service/apiService/apiDiContainer.${lang}`, 'utf8');
    const isAnnounced = data.includes(`Proxy${capitalizeFirstLetter(currentClass)}`);
    const newImport = isAnnounced
      ? ''
      : `import Api${capitalizeFirstLetter(currentClass)} from './api/Api${capitalizeFirstLetter(
          currentClass,
        )}'`;
    const newStatic = isAnnounced
      ? ''
      : `static Proxy${capitalizeFirstLetter(currentClass)} = Api${capitalizeFirstLetter(
          currentClass,
        )}`;
    fs.writeFileSync(
      `./service/apiService/apiDiContainer.${lang}`,
      `${data ? extractContentBeforeClass(data) : ''}
${newImport}
class ApiDiContainer {
${data ? extractContentInBraces(data) : ''}
${newStatic}
}
export default ApiDiContainer;`,
      'utf8',
    );
    // console.log('ge-na');
  } catch (err) {
    // console.log('cant find file, should be generated');
    fs.writeFileSync(
      `./service/apiService/apiDiContainer.${lang}`,
      `import Api${capitalizeFirstLetter(currentClass)} from './api/Api${capitalizeFirstLetter(
        currentClass,
      )}';
      class ApiDiContainer {
        static Proxy${capitalizeFirstLetter(currentClass)} = Api${capitalizeFirstLetter(
        currentClass,
      )};
      }
      export default ApiDiContainer;`,
      'utf8',
    );
  }
}
