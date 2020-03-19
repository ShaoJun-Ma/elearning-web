<template>
    <div class="update-password">
        <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px"
                 class="demo-ruleForm">
            <el-form-item label="旧密码" prop="oldPass">
                <el-input type="password" v-model="form.oldPass"
                          autocomplete="off"
                          placeholder="请输入原来的密码">
                </el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPass">
                <el-input type="password" v-model="form.newPass"
                          autocomplete="off"
                          placeholder="请输入新的密码">
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="form.checkPass"
                          autocomplete="off"
                          placeholder="请再次输入新的密码">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="updatePassword('form')">修改</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "UserChangePassword",
        data(){
            var validateCheckPass= (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                form:{
                    oldPass:"",
                    newPass:"",
                    checkPass:"",
                },
                rules: {
                    oldPass:[
                        { required: true, message: '请输入原来的密码', trigger: 'blur' }
                    ],
                    newPass: [
                        { required: true, message: '请输入新的密码', trigger: 'blur' }
                    ],
                    checkPass: [
                        { required: true, validator: validateCheckPass, trigger: 'blur' }
                    ]
                }
            };
        },
        methods:{
            //修改密码
            updatePassword(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let data = this.$qs.stringify({
                            id:this.$store.state.userInfo.id,
                            oldPass:this.form.oldPass,
                            newPass:this.form.newPass,
                        });
                        this.$axios.post("/api/user/changePassword",data).then((result) => {
                            result = result.data;
                            if(result.status == 200){
                                this.$message({
                                    message:result.message,
                                    type:"success",
                                });

                                sessionStorage.setItem("isLogin","false");
                                sessionStorage.removeItem("userInfo");
                                this.$store.commit("changeIsLogin","false");
                                this.$store.commit("changeUserInfo",{});

                                this.$router.push("/");
                            }else{
                                this.$message({
                                    message:result.message,
                                    type:"error",
                                })
                            }
                        })
                    } else {
                        return false;
                    }
                });
            },
            //重置
            resetForm(formName){
                this.$nextTick(()=>{
                    this.$refs[formName].resetFields();
                })
            }
        }
    }
</script>

<style scoped>
    .update-password{
        width: 400px;
        margin-top: 20px;
    }

    .course-card-lef img{
        width: 170px;
        height: 90px;
    }

    .course-card-right p{
        margin:7px 0;
    }
    .course-card-right p span{
        margin-right: 14px;
    }

</style>