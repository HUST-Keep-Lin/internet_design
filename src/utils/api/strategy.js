import service from "..";

// 新增或修改灯光策略
export const changeLight = (light_mode, start_time, end_time) => {
  // console.log(start_time.getHours());
  const params = {
    light_mode
  }
  if(start_time){
    params.start_time = start_time
    console.log(start_time.getHours());
  }
  if(end_time){
    params.end_time = end_time
  }
  console.log('灯光策略', params);
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

//供氧策略 done
export const putOxygen = (start_oxygen_supply) => {
  console.log('供氧策略,是否开启供氧', start_oxygen_supply);
  return service({
    method: 'POST',
    url: '/strategy/oxygen',
    params: {
      start_oxygen_supply
    }
  })
}

//查询供氧策略
export const getOxygen = () => {
  return service({
    method: 'GET',
    url: '/strategy/oxygen',
  })
}

//新增或修改换水策略 done
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
  console.log('修改换水策略', params);

  return service({
    method: 'POST',
    url: '/strategy/water',
    params
  })
}
//查询换水策略
export const getWater = () => {
  return service({
    method: 'GET',
    url: '/strategy/water'
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
  console.log('智能温控', params);

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