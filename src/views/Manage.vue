<script setup lang="js">
import {ref} from 'vue'
import {changeTemperature, changeWater, changeLight, putOxygen} from '../utils/api/strategy'

const tempDialogVisible = ref(false) //设置温控参数的对话框
const temp_mode = ref(0) //温控模式 0为环境温模式 1为恒温模式
// 温控参数  目标温度、开始时间、结束时间
const target_temperature = ref(0)
const timeRange = ref('')
const start_time = ref('')
const end_time = ref('')

//改变温度策略
const changeTemp = async() => {
  tempDialogVisible.value = false
  const temp_data = await changeTemperature(temp_mode.value, target_temperature.value, start_time.value, end_time.value)
}

//水质策略
const water_mode = ref(0)  //0代表浊度阈值，1代表间隔换水阈值
const threshold_value = ref(10) //水浊度
const water_change_interval = ref(0) //换水周期
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
const light_start_time = ref('')
const light_end_time = ref('')

//供养策略
const start_oxygen_supply = ref(true) //true为开启供氧，false为关闭

//投喂策略
const feed_time = ref('')
const feed_amount = ref(20)
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
        <el-button @click="tempDialogVisible = true">设置温度参数</el-button>
        <el-dialog
          v-model="tempDialogVisible"
          title="设置温控参数"
          width="600px"
        >
          <el-form
            label-postion="left"
            label-width="100px"
          >
            <el-form-item
              label="设定温度"
              required
            >
              <el-input v-model="target_temperature"></el-input>
            </el-form-item>
            <el-form-item
              label="恒温时间"
              required
            >
              <el-date-picker
                v-model="timeRange"
                type="datetimerange"
                label="Pick a date"
                start-placeholder="Start"
                end-placeholder="End"
                style="width: 100%"
              />
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="tempDialogVisible = false">Cancel</el-button>
              <el-button
                type="primary"
                @click="
                  () => {
                    changeTemp();
                  }
                "
              >
                Confirm
              </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="current">
        <span>当前温度：</span>
      </div>
      <div class="temp-set">
        <span>设定温度: {{ target_temperature }}</span>
      </div>
    </div>
    <div class="water item">
      <div class="water_mode">
        <span>换水模式</span>
        <el-switch
          v-model="water_mode"
          active-text="间隔时间换水"
          inactive-text="浊度换水"
          active-value="1"
          inactive-value="0"
          @change="
            () => {
              changeWater(water_mode, threshold_value, water_change_interval);
            }
          "
        />
      </div>
      <div class="set-turbidity">
        <span>设置水浊度</span>
        <el-select
          v-model="threshold_value"
          placeholder="选择水浊度"
        >
          <el-option
            v-for="item in waterChangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div class="set-water-interval">
        <span>设置换水周期：</span>
        <el-select
          v-model="water_change_interval"
          placeholder="选择换水周期"
        >
          <el-option
            v-for="item in waterChangeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <div
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
      <el-switch
        v-model="start_oxygen_supply"
        active-text="开启供氧"
        inactive-text="关闭供氧"
        @change="
          () => {
            console.log(start_oxygen_supply);
            putOxygen(start_oxygen_supply);
          }
        "
      />
    </div>
    <div class="light item">
      <div class="light_mode">
        <span>灯光模式</span>
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
      </div>
      <div class="set-light-time">
        <span>开关灯时间设置</span>
      </div>
    </div>
    <div class="feed item">
      <div class="feed_mode">
        <span>投喂策略：</span>
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
    height: 200px;
    font-size: 20px;
    padding: 10px;
    margin: 10px;
    background-image: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
    border-radius: 20px;
  }
}
</style>
