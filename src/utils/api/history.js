import service from "..";

export const getHistoryData = (type, time) => {
  return service({
    method: 'GET',
    url: `main/history/${type}`,
    params: {
      date: time
    }
  })
}
