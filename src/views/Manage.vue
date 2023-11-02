<script setup>
import { ref, onMounted, onUpdated,onBeforeMount } from 'vue'
import { changeTemperature, changeWater, changeLight, getLight, getWater } from '../utils/api/strategy'
import { getSwitch, getCurrent } from '../utils/api/main'


const temp_mode = ref(0) //温控模式 0为环境温模式 1为恒温模式
// 温控参数  目标温度、开始时间、结束时间
const target_temperature = ref(0)
const timeRange = ref([
  new Date(2016, 9, 10, 8, 40),
  new Date(2016, 9, 10, 9, 40),
])
const start_time = ref('')
const end_time = ref('')

//改变温度策略
const changeTemp = async () => {
  start_time.value = timeRange.value[0].getHours() + ':' + timeRange.value[0].getMinutes()
  end_time.value = timeRange.value[1].getHours() + ':' + timeRange.value[1].getMinutes()
  await changeTemperature(temp_mode.value, target_temperature.value, start_time.value, end_time.value)
}

//水质策略
const water_mode = ref(null)  //0代表浊度阈值，1代表间隔换水阈值
const threshold_value = ref(null) //水浊度
const water_change_interval = ref(null) //换水周期
// 换水周期选项
const waterChangeOptions = [
  {
    label: '30',
    value: 30
  },
  {
    label: '60',
    value: 60
  },
  {
    label: '90',
    value: 90
  },
  {
    label: '120',
    value: 120
  }
]

//灯光策略
const light_mode = ref(1) //灯光模式 0 固定时间开关灯， 1代表自动开关灯
const time_value1 = ref(null)
const time_value2 = ref(null)
const light_start_time = ref('')
const light_end_time = ref('')
// 格式化时间
const formatStartTime = (time) => {
  light_start_time.value = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
}
const formatEndTime = (time) => {
  light_end_time.value = time.getHours() + ':' + time.getMinutes() + ':' + time.getSeconds()
}
//供养策略
const start_oxygen_supply = ref(1) //true为开启供氧，false为关闭

//投喂策略
const feed_time = ref('')
const feed_amount = ref(20)

// 界面初始化函数
const init = async () => {
  let res = await getLight()
  let data = res.data.body[0]
  light_mode.value = data.light_mode
  start_time.value = data.start_time
  end_time.value = data.end_time

  res = await getCurrent()
  data = res.data.body[0]
  console.log('data', data);
  if(data.oxygen_supply) start_oxygen_supply.value =  1
  else start_oxygen_supply.value = 0

  res = await getWater()
  data = res.data.body[0]
  water_mode.value = data.water_mode
  threshold_value.value = data.threshold_value
  water_change_interval.value = data.water_change_interval
};

onBeforeMount(async () => {
  await init()
  console.log('Mounted结束');
})
// onUpdated(() => {
//   console.log('Updated');
// })
</script>

<template>
  <div class="manage">
    <div class="temperature item">
      <div class="control">
        <span class="title">智能温控</span><br />
        <el-switch
          v-model="temp_mode"
          active-text="恒温模式"
          inactive-text="环境温模式"
          active-value="1"
          inactive-value="0"
          @change="
            () => {
              changeTemp(temp_mode);
            }
          "
        />
        <br />
        <el-form label-postion="left" label-width="100px">
          <el-form-item label="设定温度">
            <el-input v-model="target_temperature"></el-input>
          </el-form-item>
          <el-form-item label="恒温时间">
            <el-time-picker
              v-model="timeRange"
              is-range
              format="HH:mm"
              start-placeholder="Start"
              end-placeholder="End"
              style="width: 100%"
            />
          </el-form-item>
        </el-form>
      </div>
      <div class="current">
        <span>当前温度：{{ 1 }}</span>
      </div>
    </div>
    <div class="water item">
      <div class="water_mode">
        <span class="title">换水模式</span> <br />
        <el-switch
          v-model="water_mode"
          active-text="间隔时间换水"
          inactive-text="浊度换水"
          :active-value=1
          :inactive-value=0
          @change="
            () => {
              changeWater(water_mode, threshold_value, water_change_interval);
            }
          "
        />
      </div>
      <div class="set-turbidity">
        <span>设置水浊度&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <el-select v-model="threshold_value" placeholder="选择水浊度">
          <el-option
            v-for="item in waterChangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="set-water-interval">
        <span>设置换水周期</span>
        <el-select v-model="water_change_interval" placeholder="选择换水周期">
          <el-option
            v-for="item in waterChangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div
        class="change-water-btn"
        @click="
          () => {
            changeWater(water_mode, threshold_value, water_change_interval);
          }
        "
      >
        启用该设置模式
      </div>
    </div>
    <div class="oxygen item">
      <span class="title">智能供氧</span> <br />
      <el-switch
        v-model="start_oxygen_supply"
        active-text="开启供氧"
        inactive-text="关闭供氧"
        :active-value=1
        :inactive-value=0
        @change="
          () => {
            if(start_oxygen_supply === 1){
              getSwitch(undefined,true,undefined,undefined)
              console.log('start_oxygen_supply=', start_oxygen_supply);
              console.log(111111);
            }else{
              getSwitch(undefined,false, undefined, undefined)
            }
          }
        "
      />
    </div>
    <div class="light item">
      <div class="light_mode">
        <span class="title">智能灯光</span>
        <br />
        <el-switch
          v-model="light_mode"
          active-text="自动开关灯"
          inactive-text="固定时间开关灯"
          active-value="1"
          inactive-value="0"
          @change="
            () => {
              changeLight(light_mode, light_start_time, light_end_time);
            }
          "
        />
        <div class="example-basic">
          <el-time-picker
            v-model="time_value1"
            placeholder="开始时间"
            @change="() => formatStartTime(time_value1)"
          />
          <br />
          <el-time-picker
            v-model="time_value2"
            arrow-control
            placeholder="结束时间"
            @change="() => formatEndTime(time_value2)"
          />
        </div>
      </div>
    </div>
    <div class="feed item">
      <div class="feed_mode">
        <span class="title">投喂策略：</span>
        <br />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.manage {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  .item {
    width: 45%;
    font-size: 16px;
    padding: 10px;
    margin: 10px;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    border-radius: 20px;

    .title {
      font-size: 20px;
      font-weight: 300;
      color: rgb(195, 62, 207);
    }

    .change-water-btn {
      display: inline-block;
      margin: 5px;
      border: solid 1px rgb(105, 152, 210);
      border-radius: 5px;
      cursor: pointer;
    }
  }
}
</style>
