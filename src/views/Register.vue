<template>
  <div class="register">
    <div
      class="myregister"
      align="center"
    >
      <h4>注册鱼缸账号</h4>
      <el-form
        :model="registerForm"
        :rules="registerRules"
        ref="registerFormRef"
        label-width="0px"
      >
        <el-form-item
          label=""
          prop="account"
          style="margin-top: 20px"
        >
          <el-row>
            <el-col :span="0">
              <span class="el-icon-s-custom"></span>
            </el-col>
            <el-col :span="24">
              <el-input
                class="inps"
                placeholder="账号"
                v-model="registerForm.account"
              >
              </el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label=""
          prop="password"
        >
          <el-row>
            <el-col :span="0">
              <span class="el-icon-lock"></span>
            </el-col>
            <el-col :span="24">
              <el-input
                class="inps"
                type="password"
                placeholder="密码"
                v-model="registerForm.password"
                show-password
                @keyup.enter="submitForm(registerFormRef)"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label=""
          prop="id"
        >
          <el-row>
            <el-col :span="0">
              <span class="el-icon-lock"></span>
            </el-col>
            <el-col :span="24">
              <el-input
                class="inps"
                placeholder="硬件id"
                v-model="registerForm.id"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 25px">
          <el-button
            type="primary"
            round
            class="submitBtn"
            @click="submitForm(registerFormRef)"
            >注册
          </el-button>
        </el-form-item>
        
        <div class="unlogin">
          <router-link :to="{ path: '/login' }">
            <a
              href="login"
              target="_blank"
              align="right"
              >登录账号</a
            >
          </router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { register } from "@/utils/api/admin.js";
// 登录表单ref
const registerFormRef = ref();

const registerForm = reactive({
  account: "",
  password: "",
  id:""
});
const registerRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const router = useRouter();
const submitForm = async (formEl) => {
  const userAccount = registerForm.account;
  const userpassword = registerForm.password;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await register(userAccount, userpassword);
      console.log(res);
      localStorage.setItem("token", "Bearer " + res.data.token);
      router.push("/user/home");
    } else {
      console.log("error submit!", fields);
    }
  });
};
</script>

<style lang="less">
.register {
  width: 100vw;
  padding: 0;
  margin: 0;
  height: 100vh;
  font-size: 16px;
  background-position: left top;
  background-color: #242645;
  color: #fff;
  font-family: "Source Sans Pro";
  position: relative;
}

.myregister {
  width: 250px;
  height: 350px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 40px;
  box-shadow: -15px 15px 15px rgba(6, 17, 47, 0.7);
  opacity: 1;
  background: linear-gradient(
    230deg,
    rgba(53, 57, 74, 0.5) 0%,
    rgb(0, 0, 0) 100%
  );
}

.inps input {
  border: none;
  color: #000000;
  background-color: transparent;
  font-size: 12px;
}

.submitBtn {
  background-color: transparent;
  color: #39f;
  width: 200px;
}
</style>
