import service from "..";

export const getCurrent = () => {
  return service({
    method: 'GET',
    url: '/main/current',
  })
}

export const getHistory = (start) => {
  return service({
    method: 'GET',
    url: '/main/history',
    params: {
      start
    }
  })
}