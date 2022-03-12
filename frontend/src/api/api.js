import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:8000",
  // baseURL: "http://34.238.235.4:8000",
});

export { api };
