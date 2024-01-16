import fs from 'fs';
import { extractContentBeforeClass, extractContentInBraces } from '../constant.js';
import { capitalizeFirstLetter } from './apiTemplate.js';

export function processClass(currentClass) {
  let cont = [];

  try {
    const data = fs.readFileSync('./service/apiService/apiDiContainer.js', 'utf8');
    console.log(
      'file includes, try to paste',
      data.includes(`Proxy${capitalizeFirstLetter(currentClass)}`),
    );
    const isAnnounced = data.includes(`Proxy${capitalizeFirstLetter(currentClass)}`);
    const newImport = isAnnounced
      ? ''
      : ` import Api${capitalizeFirstLetter(currentClass)} from './api/Api${capitalizeFirstLetter(
          currentClass,
        )}'`;
    const newStatic = isAnnounced
      ? ''
      : ` static Proxy${capitalizeFirstLetter(currentClass)} = Api${capitalizeFirstLetter(
          currentClass,
        )}`;
    fs.writeFileSync(
      `./service/apiService/apiDiContainer.js`,
      `
      ${data ? extractContentBeforeClass(data) : ''}
      ${newImport}
      class ApiDiContainer {
        ${data ? extractContentInBraces(data) : ''}
       ${newStatic}
      }
      export default ApiDiContainer;
      `,
      'utf8',
    );
  } catch (err) {
    console.log('cant find file, should be generated');
    fs.writeFileSync(
      `./service/apiService/apiDiContainer.js`,
      `
      import Api${capitalizeFirstLetter(currentClass)} from './api/Api${capitalizeFirstLetter(
        currentClass,
      )}';
      class ApiDiContainer {
        static Proxy${capitalizeFirstLetter(currentClass)} = Api${capitalizeFirstLetter(
        currentClass,
      )};
      }
      export default ApiDiContainer;
      `,
      'utf8',
    );
  }
}
