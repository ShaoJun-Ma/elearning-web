<template>
    <div class="register">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" type="text" placeholder="请输入登录手机号/邮箱">
                </el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-form-item label="密码确认" prop="checkPass">
                <el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码">
                </el-input>
            </el-form-item>
            <div class="agreement">
                <el-checkbox v-model="checked">同意《white注册协议》&《隐私政策》
                </el-checkbox>
            </div>
            <el-form-item>
                <el-button type="primary" @click="register('form')">注册</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "Register",
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
                    if (this.form.checkPass !== '') {
                        this.$refs.form.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePassword2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                checked:false,
                form:{
                    username:'',
                    password:'',
                    checkPass:'',
                },
                rules: {
                    username: [
                        {validator: validateUsername, trigger: 'blur'},
                    ],
                    password: [
                        {validator: validatePassword, trigger: 'blur'},
                    ],
                    checkPass:[
                        {validator: validatePassword2, trigger: 'blur'},
                    ]
                }
            }
        },
        methods:{
            register(fonmName){
                this.$refs[fonmName].validate((valid) => {
                    if(valid){
                        if(this.checked == true){
                            this.getRegisterRequest();
                        }else{
                            this.$message({
                                message:"同意注册协议才能进行注册！",
                                type: 'error'
                            });
                        }
                    }else{
                        return false;
                    }
                })
            },
            getRegisterRequest(){
                let data = this.$qs.stringify({
                    username:this.form.username,
                    password:this.form.password,
                });
                this.$axios.post("/api/user/register",data).then((result) => {
                    result = result.data;
                    if(result.status == 200){
                        this.$message({
                            message:result.message,
                            type:"success",
                        })
                    }else{
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
    .register{
        width: 80%;
        height: 70%;
        margin-top: 30px;
        margin-left: 20px;
    }
    .agreement{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: left;
        margin-left: 20px;
        padding-left: 65px;
        padding-bottom: 10px;
    }
    .el-button--primary{
        width: 100%;
    }
</style>