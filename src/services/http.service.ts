import Axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = process.env.NODE_ENV === 'production'
    ? '/api/'
    : 'http://localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true,
});

export const httpService = { 
  async get(endpoint: string, data?: any) {
    return ajax(endpoint, 'GET', data);
  },
  async post(endpoint: string, data?: any) {
    return ajax(endpoint, 'POST', data);
  },
  async put(endpoint: string, data?: any) {
    return ajax(endpoint, 'PUT', data);
  },
  async delete(endpoint: string, data?: any) {
    return ajax(endpoint, 'DELETE', data);
  },
};

async function ajax(endpoint: string, method: string = 'GET', data: any = null) {
  try {
    const config: AxiosRequestConfig = {
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    };

    const res = await axios(config);

    return res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
}