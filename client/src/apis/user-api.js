import axios from "axios";

const baseURL = process.env.ENV === 'PROD' ? '' : 'http://localhost:3000'

export const USER_API = axios.create({
  baseURL: baseURL + "/api/user",
  withCredentials: false
});