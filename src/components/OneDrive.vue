<template>
    <div>
        <el-button size="" type="primary" @click="logindialog = true">HUAWEI同步</el-button>
        <el-dialog v-model="logindialog">
            <el-radio-group v-model="Logintab">
                <el-radio-button label="login">登录</el-radio-button>
                <el-radio-button label="res">注册</el-radio-button>
            </el-radio-group>
            <Login v-if="Logintab == 'login'"></Login>
            <Register v-if="Logintab == 'res'"></Register>
        </el-dialog>
    </div>
</template>

<script>
import { getCurrentInstance } from 'vue';
import Login from './Login.vue';
import Register from './Register.vue';

export default {
    components: { Login, Register },
    name: 'AyakaTeaRoomVue3OneDrive',
    setup() {
        const instance = getCurrentInstance();

        if (instance) {
            const agconnect = instance.appContext.config.globalProperties.$agconnect
            return {
            };
        }
    },
    data() {
        return {
            Logintab: "login",
            logindialog: false,
            accessToken: "",
        };
    },

    mounted() {

    },

    methods: {
    },
};
</script>

<style lang="scss" scoped></style>