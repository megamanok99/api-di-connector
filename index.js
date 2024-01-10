// ES Modules
import fetch from 'node-fetch';

import pkg from 'enquirer';
import fs from 'fs';
import generateRestClient from './templates/generateRestClient.js';

// const { Input, AutoComplete } = require('enquirer');
// const fetch = require('node-fetch');
// const fs = require('fs');
const { Input, AutoComplete } = pkg;

// directory path
const dir = './service/apiService/api';

// create new directory
try {
  let name = `
  interface 
  
  class ApiAction {
  // универсальные методы
 
 

}
export default ApiAction`;
  fs.writeFile('name.ts', name, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('File saved!');
  });

  generateRestClient(true);
  // first check if the directory already exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('Directory is created.');
  } else {
    console.log('Directory already exists.');
  }
} catch (err) {
  console.log(err);
}
// Expect a normal string input from the user
const askName = new Input({
  name: 'name',
  message: 'What is your name?',
});

// Let the user choose one answer
const askDrink = new AutoComplete({
  name: 'drink',
  message: 'What do you like?',
  limit: 10,
  initial: 2,
  choices: ['coffee', 'tea', 'pumpkin juice'],
});
async function getTodos(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}

const run = async () => {
  const name = await askName.run();
  // const drink = await askDrink.run();
  const resp = getTodos(name);
  console.log(resp);
};

run();
