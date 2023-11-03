import axios from "axios";

let service = axios.create({
  baseURL: 'http://414c8ed.r9.cpolar.top/',
  timeout: 3000
})

export default service