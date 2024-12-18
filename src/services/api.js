import axios from "axios";

const BASEURL = "http://localhost:3000";

const api = axios.create({
  baseURL: BASEURL,
});

export default api