import service from "..";

export const getCurrent = () => {
  return service({
    method: 'GET',
    url: '/main/current',
  })
}

export const getHistoryTemp = (date) => {
  return service({
    method: 'GET',
    url: '/main/history/temperature',
    params: {
      date
    }
  })
}

export const getHistoryWater = (date) => {
  return service({
    method: 'GET',
    url: '/main/history/water',
    params: {
      date
    }
})
}