<template>
    <div class="signIn">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
            <el-tab-pane label="登录" name="login">
                <div v-show="isLogin">
                    <login></login>
                </div>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
                <div v-show="isRegister">
                    <register></register>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Login from "@/components/signIn/Login";
    import Register from "@/components/signIn/Register";
    export default {
        name: "SignIn",
        components:{
            Login,
            Register,
        },
        data(){
            return{
                activeName:"login",
                isLogin:true,
                isRegister:false
            }
        },
        methods:{
            //切换 登录/注册模块
            handleClick(){
                this.isLogin = !this.isLogin;
                this.isRegister = !this.isRegister;
            }
        }
    }
</script>

<style scoped>
</style>