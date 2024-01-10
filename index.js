// ES Modules
import fetch from 'node-fetch';

import pkg from 'enquirer';
import fs from 'fs';

// const { Input, AutoComplete } = require('enquirer');
// const fetch = require('node-fetch');
// const fs = require('fs');
const { Input, AutoComplete } = pkg;
const generateRestClient = (isJs = true) => {
  const restClient = `


  import axios from 'axios';
  import axiosRetry from 'axios-retry';
  
  axiosRetry(axios, {
    retries: 2,
  });
  function makeUrls() {
    return 'http://188.120.235.15:9401';
  }
  
  class RestClient {
    static getAxios(url ${isJs ? '' : ': string'}, additionalHeaders = {}) {
      const config = {
        method: 'get',
        url: makeUrls() + url,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          ...additionalHeaders,
        },
      };
      return axios(config);
    }
    static getAxiosBlob(url ${isJs ? '' : ': string'}, additionalHeaders = {}) {
      const config = {
        method: 'get',
        reponseType: 'blob',
        url: makeUrls() + url,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          Accept: ' */*',
  
          ...additionalHeaders,
        },
      };
      return axios(config);
    }
    static getBlob(url${isJs ? '' : ': string'}, additionalHeaders = {}) {
      return fetch(makeUrls() + url, {
        headers: {
          accept: '*/*',
          'accept-language': 'ru,en;q=0.9,la;q=0.8',
          authorization: 'Bearer ' + sessionStorage.getItem('token'),
          Referer: 'http://188.120.235.15:9401/swagger-ui/index.html',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
        body: null,
        method: 'GET',
      });
    }
    static postAxios(url${isJs ? '' : ': string'}, data${
    isJs ? '' : ': object'
  }, additionalHeaders = {}) {
      const config = {
        method: 'post',
        url: makeUrls() + url,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          ...additionalHeaders,
        },
        data: data,
      };
      return axios(config);
    }
  
    static postAxiosBlob(url${isJs ? '' : ': string'}, data${
    isJs ? '' : ': object'
  }, additionalHeaders = {}) {
      const config = {
        method: 'post',
  
        url: makeUrls() + url,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
          ...additionalHeaders,
        },
        data: data,
      };
      return axios(config);
    }
  
    static patchAxios(url${isJs ? '' : ': string'}, data${isJs ? '' : ': object'}) {
      const config = {
        method: 'patch',
        url: makeUrls() + url,
  
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
        data: data,
      };
      return axios(config);
    }
  
    static async deleteAxios(url${isJs ? '' : ': string'}) {
      const config = {
        method: 'delete',
        url: makeUrls() + url,
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('token'),
        },
      };
      return axios(config);
    }
  }
  
  export default RestClient;
  
  
  `;
  fs.writeFile(`restClient.${isJs ? 'js' : 'ts'}`, restClient, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('generated restClient');
  });
};
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

  generateRestClient();
  // first check if the directory already exists
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
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
