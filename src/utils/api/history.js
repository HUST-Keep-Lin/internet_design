import service from "..";

export const getHistoryData = (type, time) => {
  return service({
    method: 'GET',
    url: `/history/${type}`,
    params: {
      date: time
    }
  })
}
