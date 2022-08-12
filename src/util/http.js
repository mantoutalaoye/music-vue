import axios from "axios";

// 未登录
export const http1 = axios.create({ //按需导出
  // baseURL: 'http://localhost:3000',
  baseURL: 'https://netease-cloud-music-api-one-brown.vercel.app//',
  timeout: 10000,
})
//已登录
function http2(api, cs) {
  return axios.get(`http://localhost:3000${api}?cookie=${localStorage.getItem("cookie")}${cs}`)
}

export default {
  http1,
  http2
}
