<template>
  <div class="login-wrap">
    <el-form class="login-container">
      <h1 class="title">用户注册</h1>
      <el-form-item>
        <el-input type="text" placeholder="邮箱" v-model="emailStr" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="password" placeholder="密码" v-model="password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input type="text" placeholder="验证码" style="width: 60%;" v-model="captcha" autocomplete="off"></el-input>
        <el-button type="primary" style="margin-left: 10px;width: calc(40%-10px);" :disabled="isCaptchaSending"
          @click="getCaptcha(emailStr)">获取验证码</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="reg()" style="width: 100%">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>  
  
<script>
import { ref, getCurrentInstance } from 'vue';

export default {
  name: "Res_",
  setup() {
    const instance = getCurrentInstance();
    const isCaptchaSending = ref(false); // 使用 ref 创建响应式引用  

    if (instance) {
      const agconnect = instance.appContext.config.globalProperties.$agconnect;

      const getCaptcha = async (emailStr) => {
        try {
          await agconnect.auth().requestEmailVerifyCode(emailStr,
            agconnect.auth.Action.ACTION_REGISTER_LOGIN,
            'zh_CN', // 发送验证码的语言  
            120 // 发送间隔时间  
          ).then(() => {
            isCaptchaSending.value = true;
          }).catch(error => {
            isCaptchaSending.value = false;
          });
        } catch (error) {
          isCaptchaSending.value = false;
        }
      };


      const reg = async (emailStr, password, verifyCode) => {

        if (isCaptchaSending.value) {
          let emailUser = await new agconnect.auth.EmailUser(emailStr, password, verifyCode);
          agconnect.auth().createEmailUser(emailUser)
            .then(user => {
              localStorage.setItem("islogin", true);
            }).catch(error => {
              console.log(error)
            });
        }

      }

      return {
        reg,
        isCaptchaSending, // 返回响应式引用，使其可在模板中使用  
        getCaptcha // 返回方法，使其可在模板中使用  
      };
    }
  },
  data() {
    return {
      emailStr: "",
      password: "",
      captcha: "",
    };
  },
  methods: {
  },
};  
</script>  
  
<style>  /* 样式内容 */
</style>