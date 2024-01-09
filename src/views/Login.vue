<template>
  <div class="login">
    <div
      class="mylogin"
      align="center"
    >
      <h4>管理您的鱼缸</h4>
      <el-form
        :model="loginForm"
        :rules="loginRules"
        ref="loginFormRef"
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
                v-model="loginForm.account"
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
                v-model="loginForm.password"
                show-password
                @keyup.enter="submitForm(loginFormRef)"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item style="margin-top: 25px">
          <el-button
            type="primary"
            round
            class="submitBtn"
            @click="submitForm(loginFormRef)"
            >登录
          </el-button>
        </el-form-item>
        <div class="unlogin">
          <router-link :to="{ path: '/register' }">
            <a
              href="register"
              target="_blank"
              align="center"
              >注册新账号</a
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
import { login } from "@/utils/api/admin.js";
// 登录表单ref
const loginFormRef = ref();

const loginForm = reactive({
  account: "",
  password: "",
});
const loginRules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const router = useRouter();
const submitForm = async (formEl) => {
  const userAccount = loginForm.account;
  const userpassword = loginForm.password;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const res = await login(userAccount, userpassword);
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
.login {
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

.mylogin {
  width: 250px;
  height: 310px;
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
