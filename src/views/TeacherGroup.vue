<template>
    <div>
        <list-header></list-header>
        <div class="group">
            <div class="group-container">
                <div class="group-left">
                    <p class="welcome">欢迎加入white讲师团!</p>
                    <div class="apply-info">
                        <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                            <el-form-item label="我的简介：" prop="desc">
                                <el-input type="textarea"
                                          v-model="form.desc"
                                          rows="5"
                                          placeholder="输入我的简介，尽可能体现您的主攻技术方向,从业经历,公开分享的经验等"
                                          maxlength="200"
                                          show-word-limit>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="用户名：" prop="name">
                                <el-input v-model="form.name"></el-input>
                            </el-form-item>
                            <el-form-item label="试讲视频：（可选填）" prop="video">
                                <el-upload
                                        class="upload-demo"
                                        drag
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        multiple>
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
<!--                                    <div class="el-upload__tip" slot="tip">可选填</div>-->
                                </el-upload>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="submit" type="primary" @click="submitForm('form')">提交</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="faceImg-info">
                        <img class="faceImg" :src="userInfo.faceImg"/>
                        <p class="username">{{userInfo.username}}</p>
                    </div>
                </div>
                <div class="group-right">
                    <div class="logo">
                        <img src="../assets/imgs/logo.png"/>
                    </div>
                    <p class="why">为什么要加入white讲师团？</p>
                    <p class="why-desc">
                        如果你对本课程领域擅长、能按照自己或者本求课的描述分享你的知识给互联网用户，就来应聘吧
                    </p>
                    <span class="why-desc">
                        你的课程会在white课堂及我们的合作渠道中展示和推广，你就是未来的行业大牛。
                    </span>
                </div>
                <div class="clear"></div>
            </div>
        </div>
        <list-footer></list-footer>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListFooter from "@/components/list/Footer";
    export default {
        name: "TeacherGroup",
        components:{
            ListHeader,
            ListFooter,
        },
        data(){
            return{
                rules:{
                    desc: [
                        { required: true, message: '请填写我的简介', trigger: 'blur' },
                        { min: 50, max: 200, message: '不少于50字', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ],
                },
                form:{
                    desc:"",
                    name:"",
                }
            }
        },
        computed:{
           userInfo(){
               return this.$store.state.userInfo;
            }
        },

    }
</script>

<style scoped>
    .group{
        min-width: 1400px;
        background-color: #E9EEF3;
        padding:20px;
    }
    .group-container{
        width: 1200px;
        margin: 0 auto;
    }
    .group-left{
        width: 780px;
        background-color: white;
        padding: 20px 80px 200px 20px;
        float: left;
    }
    .welcome{
        font-size: 20px;
        padding: 0 20px;
    }
    .apply-info{
        width: 70%;
        padding: 10px;
        float: left;
    }
    .faceImg-info{
        width: 75px;
        height: 120px;
        float: left;
        padding: 20px;
        margin-left: 20px;
    }
    .faceImg{
        width: 75px;
        height: 75px;
        border-radius: 50%;
        border:1px solid darkgray;
    }
    .username{
        width: 75px;
        height: 30px;
        line-height: 30px;
        margin: 0;
        padding: 10px 0;
        text-align: center;
    }
    .submit{
        width: 140px;
    }
    .group-right{
        background-color: white;
        padding: 40px 20px;
        width: 260px;
        height: 350px;
        float: right;
    }
    .logo{
        width:100%;
        height: 70px;
        background-color: #ea412b;
    }
    .logo img{
        width: 100%;
        height: 100%;
    }
    .why{
        font-size: 20px;
        font-weight: bolder;
    }
    .why-desc{
        font-size: 17px;
        padding: 10px 0;
    }
    .clear{
        clear: both;
    }
</style>