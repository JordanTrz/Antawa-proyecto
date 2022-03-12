import axios from 'axios'

export const URL_BACKEND = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  // baseURL: 'http://34.238.235.4:8000',
  headers: {
    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
    'Content-Type': 'application/json',
    'accept': 'application/json'
  }
})