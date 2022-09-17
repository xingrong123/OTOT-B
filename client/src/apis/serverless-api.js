import axios from "axios";

const SERVERLESS_URL = process.env.REACT_APP_SERVERLESS_URL

export const SERVERLESS_API = axios.create({
    baseURL: SERVERLESS_URL,
    withCredentials: false
  });