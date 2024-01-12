import fs from 'fs';
const generateRestClient = (isJs = true) => {
  const restClient = `


  import axios from 'axios';
  import axiosRetry from 'axios-retry';
  
  axiosRetry(axios, {
    retries: 2,
  });
  function makeUrls() {
    return 'http://ya.ru';
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
  fs.writeFile(`./service/apiService/restClient.${isJs ? 'js' : 'ts'}`, restClient, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('restClient generated successfully ');
  });
};
export default generateRestClient;
