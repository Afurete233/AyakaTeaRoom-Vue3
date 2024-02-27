<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户登录</h1>
      <el-form-item>
        <el-input type="text" placeholder="邮箱" v-model="username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="密码" v-model="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login" style="width: 100%">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
 
<script>
import { getCurrentInstance } from 'vue';
export default {
  name: "Login_",
  setup() {
    const instance = getCurrentInstance();
    if (instance) {
      const agconnect = instance.appContext.config.globalProperties.$agconnect
      const login = async () => {
        try {
          await agconnect.auth().signInAnonymously().then(() => {
            alert('login successfully!')
          }).catch(() => {
            return Promise.reject('sign in anonymously failed')
          })
        } catch (error) {
          console.error(error);
        }
      };



      return {
        login
      };
    }
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
  },
};
</script>
 
<style>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  /* background-color: #112346; */
  background-repeat: no-repeat;
  background-position: center right;
  background-size: 100%;
}

.login-container {
  border-radius: 10px;
  padding: 30px 35px 15px 35px;
  background: #fff;
}

.title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>
 
