// ES Modules
import fetch from 'node-fetch';

import pkg from 'enquirer';
import fs from 'fs';
import { generateApi } from './templates/apiTemplate.js';
import generateRestClient from './templates/generateRestClient.js';

// const { Input, AutoComplete } = require('enquirer');
// const fetch = require('node-fetch');
// const fs = require('fs');
const { Input, AutoComplete } = pkg;

// directory path
const dir = './service/apiService/api';

// create new directory

// Expect a normal string input from the user
const askName = new Input({
  name: 'name',
  message: 'добавьте ссылку на сваггер',
});

// Let the user choose one answer
const askDrink = new AutoComplete({
  name: 'drink',
  message: 'Какой язык в проекте?',

  choices: ['js', 'ts'],
});
async function fetchSwagger(url) {
  const response = await fetch(url);
  const data = await response.json();

  const { paths } = data;

  generateApi(paths);
}

const run = async () => {
  const name = await askName.run();

  const drink = await askDrink.run();

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Directory is created.');
  } else {
    console.log('Directory already exists.');
  }

  generateRestClient(true);

  fetchSwagger(name);
  // const resp = getTodos(name);
  // console.log(resp);
};

run();
