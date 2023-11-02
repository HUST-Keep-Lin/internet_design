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

export const getSwitch = (automatic_water_change, oxygen_supply, feed, light) => {
  const params = {}
  if(automatic_water_change){
    params.automatic_water_change = automatic_water_change
  }
  if(oxygen_supply){
    params.oxygen_supply = oxygen_supply
  }
  if(feed){
    params.feed = feed
  }
  if(light){
    params.light = light
  }
  return service({
    method: 'POST',
    url: '/main/switches',
    params
})
}