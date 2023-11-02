<template>
  <div class="history">
    <div class="select">
      <el-select
        v-model="value"
        class="m-2"
        placeholder="选择参数"
        size="large"
      >
        <el-option
          v-for="item in parameter"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          ><p style="text-align: center">{{ item.label }}</p></el-option
        >
      </el-select>
      <el-select
        v-model="time"
        class="m-2"
        placeholder="选择时间"
        size="large"
      >
        <el-option
          v-for="item in 30"
          :key="item"
          :label="`11 月 ${item} 号`"
          :value="item"
          ><p style="text-align: center">
            {{ `11月${item}号` }}
          </p></el-option
        >
      </el-select>
    </div>
    <div
      class="figure"
      style="text-align: center"
    >
      <canvas
        id="cvs"
        width="850"
        height="600"
      ></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";

const value = ref("");
const time = ref("");
const parameter = [
  {
    value: "temperature",
    label: "温度",
  },
  {
    value: "waterQuality",
    label: "水质",
  },
  {
    value: "lighting",
    label: "灯光",
  },
];
const drawCanvas = (points) => {
  const cvs = document.getElementById("cvs");
  const ctx = cvs.getContext("2d");

  // 坐标轴距离画布上右下左的边距
  const padding = {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40,
  };
  // 坐标轴中箭头的宽和高
  const arrow = {
    width: 12,
    height: 20,
  };
  // 求坐标轴上顶点的坐标
  const vertexTop = {
    x: padding.left,
    y: padding.top,
  };
  // 求坐标轴原点的坐标
  const origin = {
    x: padding.left,
    y: cvs.height - padding.bottom,
  };
  // 求坐标轴右顶点的坐标
  const vertexRight = {
    x: cvs.width - padding.left,
    y: cvs.height - padding.bottom,
  };

  //设置线宽
  ctx.lineWidth = 2;
  //画坐标轴的两条线
  ctx.beginPath();
  ctx.moveTo(vertexTop.x, vertexTop.y);
  ctx.lineTo(origin.x, origin.y);
  ctx.lineTo(vertexRight.x, vertexRight.y);
  ctx.stroke();

  //如何画箭头
  //画顶上箭头
  // ^
  // |
  // |
  ctx.beginPath();
  ctx.moveTo(vertexTop.x, vertexTop.y);
  ctx.lineTo(vertexTop.x - arrow.width / 2, vertexTop.y + arrow.height);
  ctx.lineTo(vertexTop.x, vertexTop.y + arrow.height / 2);
  ctx.lineTo(vertexTop.x + arrow.width / 2, vertexTop.y + arrow.height);
  ctx.fill();
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "℃",
    vertexTop.x - arrow.width / 2 - 15,
    vertexTop.y + arrow.height
  );
  //画右边的箭头
  // --->
  ctx.beginPath();
  ctx.moveTo(vertexRight.x, vertexRight.y);
  ctx.lineTo(vertexRight.x - arrow.height, vertexRight.y - arrow.width);
  ctx.lineTo(vertexRight.x - arrow.height / 2, vertexRight.y);
  ctx.lineTo(vertexRight.x - arrow.height, vertexRight.y + arrow.width);
  ctx.fill();
  ctx.font = "14px Arial";
  ctx.textAlign = "center";
  ctx.fillText(
    "时间 t",
    vertexRight.x - arrow.height + 10,
    vertexRight.y + arrow.width + 20
  );

  /*
   * 在坐标轴中指定位置画点，坐标算法：
   * 点的x轴：原点x坐标 + 点到原点的水平距离
   * 点的y轴：原点y坐标 - 点到原点的垂直距离
   */
  //定义点的坐标

  points.forEach((each) => {
    each[0] *= 30;
    each[1] *= 10;
  });
  //在坐标中画点 使用循环遍历数组中的坐标
  //设置颜色
  ctx.fillStyle = "red";
  points.forEach(function (arr) {
    ctx.fillRect(origin.x + arr[0], origin.y - arr[1], 5, 5);
  });
  //根据点连线
  //防止重绘
  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  points.forEach(function (arr) {
    ctx.lineTo(origin.x + arr[0] + 1.8, origin.y - arr[1] + 1.8);
  });
  //描边
  ctx.stroke();
  // 绘制刻度
  const scale = {
    x: 30, // x轴刻度间隔
    y: 50, // y轴刻度间隔
  };

  // 绘制x轴刻度
  ctx.fillStyle = "black";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";
  for (
    let x = 0;
    x <= vertexRight.x - padding.left && x <= scale.x * 24;
    x += scale.x
  ) {
    ctx.beginPath();
    ctx.moveTo(origin.x + x, origin.y - 5);
    ctx.lineTo(origin.x + x, origin.y);
    ctx.stroke();
    ctx.fillText((x / 30).toString(), origin.x + x, origin.y + 20);
  }

  // 绘制y轴刻度
  ctx.textAlign = "right";
  for (let y = scale.y; y <= origin.y - padding.top; y += scale.y) {
    ctx.beginPath();
    ctx.moveTo(origin.x, origin.y - y);
    ctx.lineTo(origin.x + 5, origin.y - y);
    ctx.stroke();
    ctx.fillText((y / 10).toString(), origin.x - 10, origin.y - y + 5);
  }
};
onMounted(() => {
  const points = [
    [1, 10],
    [5, 5],
    [9, 34],
    [13, 13],
    [17, 17],
    [20, 24],
  ];
  drawCanvas(points);
});
watch(
  () => [value.value, time.value],
  () => {
    if (value.value && time.value) {
      console.log("发起请求，调用'drawCanvas'");
    }
  }
);
</script>
<style lang="less" scoped>
.select {
  padding: 10px;
  .el-select {
    --el-color-primary: #4caf50;
    --el-select-input-font-size: 0;
    --el-border-color-hover: transparent;
    margin-right: 20px;
    :deep(.el-input) {
      height: 58px;
      width: 129px;
      color: white;
      --el-input-border: 0px;
      --el-input-border-color: transparent;
      --el-border-radius-base: 5px;
      --el-fill-color-blank: #4caf50;
      .el-input__suffix {
        display: none;
      }
      input {
        text-align: center;
        font-size: 20px;
        color: white;
        &::placeholder {
          color: white;
        }
      }
    }
  }
}
.el-select-dropdown__item.selected {
  --el-color-primary: #4caf50;
}
</style>
