<template>
    <div>
        <el-button size="" type="primary" @click="login">HUAWEI同步</el-button>
        <!-- <el-dialog v-model="logindialog">
            <el-radio-group v-model="Logintab">
                <el-radio-button label="login">登录</el-radio-button>
                <el-radio-button label="res">注册</el-radio-button>
            </el-radio-group>
            <Login v-if="Logintab == 'login'"></Login>
            <Register v-if="Logintab == 'res'"></Register>
        </el-dialog> -->
    </div>
</template>

<script>

export default {
    name: 'AyakaTeaRoomVue3OneDrive',
    setup() {
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