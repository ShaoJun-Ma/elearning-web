<template>
    <div class="signIn">
        <el-tabs v-model="activeName" type="border-card">
            <el-tab-pane label="登录" name="login">
                <login></login>
            </el-tab-pane>
            <el-tab-pane label="注册" name="register">
                <register></register>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
    import Login from "@/components/signIn/Login";
    import Register from "@/components/signIn/Register";
    export default {
        name: "SignIn",
        props:{
            activeName:String,
        },
        components:{
            Login,
            Register,
        },
        data(){
            return{
                isLogin:true,
                isRegister:false
            }
        }
    }
</script>

<style scoped>
</style>