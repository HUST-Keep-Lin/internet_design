import service from "..";

// 新增或修改灯光策略
export const changeLight = (light_mode, start_time, end_time) => {
  const params = {
    light_mode
  }
  if(start_time){
    params.start_time = start_time
  }
  if(end_time){
    params.end_time = end_time
  }
  return service({
    method: 'POST',
    url: '/strategy/light',
    params
  })
}

// 查询灯光策略
export const getLight = () => {
  return service({
    method: 'GET',
    url: '/strategy/light'
  })
}

//供氧策略
export const putOxygen = (start_oxygen_supply) => {
  return service({
    method: 'PUT',
    url: '/strategy/oxygen',
    params: {
      start_oxygen_supply
    }
  })
}

//新增或修改换水策略
/*
  water_mode 1 Number
  threshold_value 0 Number
  water_change_interval 0 Number
*/
export const changeWater = (water_mode, threshold_value, water_change_interval) => {
  const params = {
    water_mode
  }
  if(threshold_value){
    params.threshold_value = threshold_value
  }
  if(water_change_interval){
    params.water_change_interval = water_change_interval
  }

  return service({
    method: 'POST',
    url: '/strategy/water',
    params
  })
}

//新增或修改温度策略
export const changeTemperature = (temperature_mode, target_temperature, start_time, end_time) => {
  const params = {
    temperature_mode
  }
  if(target_temperature){
    params.target_temperature = target_temperature
  }
  if(start_time){
    params.start_time = start_time
  }
  if(end_time){
    params.end_time = end_time
  }

  return service({
    method: 'POST',
    url: '/strategy/temperature',
    params
  })

}

//新增或修改喂食策略
export const changeFeed = (feed_time, amount) => {
  return service({
    method: 'POST',
    url: '/strategy/feed',
    data: {
      feed_time,
      amount
    }
  })
}
//立即喂食

export const feedNow = (amount) => {
  return service({
    method: 'POST',
    url: '/strategy/feed/now',
    params: {
      amount
    }
  })
}