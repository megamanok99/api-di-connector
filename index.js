import pkg from 'enquirer';
import fs from 'fs';
import { fetchSwagger } from './fetch.js';
import { generateApi } from './templates/apiTemplate.js';
import { generateInterfaces } from './templates/generateInterface.js';
import generateRestClient from './templates/generateRestClient.js';
const { Input, AutoComplete } = pkg;
const dir = './service/apiService/api';
const askUrl = new Input({
  name: 'url',
  message: 'добавьте ссылку на сваггер',
});
const askLang = new AutoComplete({
  name: 'lang',
  message: 'Какой язык в проекте?',

  choices: ['js', 'ts'],
});

const run = async () => {
  try {
    const url = await askUrl.run();

    const lang = await askLang.run();
    fetchSwagger(url).then((data) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      generateRestClient(lang, data.servers[0]?.url);

      try {
        lang == 'ts' && generateInterfaces(data.components.schemas);
        console.log('🟢:Interfaces generated successfully ');
      } catch (err) {
        console.log(`🔴:`, err);
      }

      try {
        generateApi(data.paths, lang);
        console.log('🟢:ApiDiContainer generated successfully ');
      } catch (err) {
        console.log(`🔴:`, err);
      }
    });
  } catch {
    console.warn('generation is suspended');
  }
};
run();
