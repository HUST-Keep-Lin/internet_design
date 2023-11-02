import axios from "axios";

let service = axios.create({
  baseURL: 'http://610f75ab.r18.cpolar.top/',
  timeout: 3000
})

export default service