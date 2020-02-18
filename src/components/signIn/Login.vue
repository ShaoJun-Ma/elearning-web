<template>
    <div class="login">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" type="text" placeholder="请输入登录手机号/邮箱">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password"  placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <div class="check-login">
                <!--                <el-checkbox v-model="checked" class="auto-login">7天内自动登录</el-checkbox>-->
                <el-link type="warning" class="forget-pass">忘记密码?</el-link>
            </div>
            <el-form-item>
                <el-button type="primary" @click="login('form')">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            var validateUsername = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入登录手机号/邮箱'));
                } else {
                    callback();
                }
            };
            var validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    callback();
                }
            };
            return{
                form:{
                    username:"msj",
                    password:111,
                },
                rules:{
                    username: [
                        {validator: validateUsername, trigger: 'blur'},
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'},
                    ]
                }
            };
        },
        methods:{
            login(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        this.getLoginRequest();
                    }else{
                        return false;
                    }
                })
            },
            getLoginRequest(){
                let data = this.$qs.stringify({
                    username:this.form.username,
                    password:this.form.password,
                });
                this.$axios.post("/api/user/login",data).then((result) => {
                    result = result.data;
                    if(result.status == 200){
                        //登录成功
                        this.$message({
                            message:result.message,
                            type:"success",
                        });
                        this.$router.go(0);
                        //更新 vuex 中 state 的数据
                        this.$store.commit("changeIsLogin","true");
                        this.$store.commit("changeUserInfo",result.result);
                        //更新缓存
                        sessionStorage.setItem("isLogin","true");
                        sessionStorage.setItem("userInfo",this.$qs.stringify(result.result))
                    }else{
                        //登录失败
                        this.$message({
                            message:result.message,
                            type:"error",
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .login{
        width: 80%;
        height: 70%;
        margin-top: 30px;
        margin-left: 20px;
    }
    .check-login{
        width: 100%;
        height: 30px;
        line-height: 30px;
    }
    .el-button--primary{
        width: 100%;
    }
    .auto-login{
        margin-left: 80px;
    }
    .forget-pass{
        float: right;
    }
    .other-way{
        margin-left: 100px;
    }
    .info-hover{
        cursor: pointer;
    }

</style>