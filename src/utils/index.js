import axios from "axios";

let service = axios.create({
  baseURL: 'http://4b22ca9c.r18.cpolar.top',
  timeout: 3000
})

export default service