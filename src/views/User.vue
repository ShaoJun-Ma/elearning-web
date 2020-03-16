<template>
    <div>
        <list-header></list-header>
        <div class="user">
            <div class="user-container">
                <div class="user-set">
                    <img class="user-set-logo" src="../assets/imgs/user-set.png">
                    <h3 class="user-set-title">个人设置</h3>
                    <div class="clear"></div>
                </div>
                <div class="user-info">
                    <div class="face-img-area">
                        <img :src="userInfo.faceImg"/>
                        <el-button type="text" @click="dialogVisible = true" class="update-faceImg">修改头像</el-button>
                        <!--修改头像-->
                        <el-dialog
                                title="修改头像"
                                :visible.sync="dialogVisible"
                                width="500px"
                                :before-close="handleClose">
                            <div>
                                <el-upload
                                        ref="uploadImg"
                                        class="avatar-uploader"
                                        action=""
                                        :show-file-list="false"
                                        :on-change="changeAvatar"
                                        :before-upload="beforeAvatarUpload"
                                        :auto-upload=false>
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                                <span class="img-rule">图片宽度*高度至少为150*150像素，大小不超过2MB</span>
                            </div>
                            <span slot="footer" class="dialog-footer">
                                <el-button @click="cancel">取 消</el-button>
                                <el-button type="primary" @click="uploadAvatar">确 定</el-button>
                              </span>
                        </el-dialog>
                        <h1 class="nickname">msj</h1>
                        <el-button type="danger" plain class="update-self">编辑个人信息</el-button>
                    </div>
                    <div class="user-data">
                        <p>
                            <span>性别：{{userInfo.sex}}</span>
                            <span>角色：{{userInfo.role}}</span>
                        </p>
                        <p>所在城市：{{userInfo.city}}</p>
                        <p>个人签名：{{userInfo.signature}}</p>
                    </div>
                </div>
                <div class="user-center-con">
                    <el-tabs type="border-card">
                        <!--个人信息-->
                        <el-tab-pane>
                            <span slot="label">
                                    <i class="el-icon-user"></i>
                                    个人信息
                                </span>
                            <user-info></user-info>
                        </el-tab-pane>
                        <!--修改密码-->
<!--                        <el-tab-pane>-->
<!--                                <span slot="label">-->
<!--                                    <i class="el-icon-edit-outline">-->
<!--                                    </i>-->
<!--                                    修改密码-->
<!--                                </span>-->
<!--                            <div class="update-password">-->
<!--                                <el-form :model="passwordForm" status-icon :rules="rules" ref="passwordRuleForm" label-width="100px" class="demo-ruleForm">-->
<!--                                    <el-form-item label="旧密码" prop="pass">-->
<!--                                        <el-input type="password" v-model="passwordForm.oldPass"-->
<!--                                                  autocomplete="off"-->
<!--                                                  placeholder="请输入原来的密码">-->
<!--                                        </el-input>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="密码" prop="newPass">-->
<!--                                        <el-input type="password" v-model="passwordForm.newPass"-->
<!--                                                  autocomplete="off"-->
<!--                                                  placeholder="请输入新的密码">-->
<!--                                        </el-input>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item label="确认密码" prop="checkNewPass">-->
<!--                                        <el-input type="password" v-model="passwordForm.checkNewPass"-->
<!--                                                  autocomplete="off"-->
<!--                                                  placeholder="请再次输入新的密码">-->
<!--                                        </el-input>-->
<!--                                    </el-form-item>-->
<!--                                    <el-form-item>-->
<!--                                        <el-button type="primary" @click="changePassword('passwordForm')">修改</el-button>-->
<!--                                        <el-button @click="resetPasswordForm('passwordForm')">重置</el-button>-->
<!--                                    </el-form-item>-->
<!--                                </el-form>-->
<!--                            </div>-->
<!--                        </el-tab-pane>-->
                        <!--收货地址-->
<!--                        <el-tab-pane>-->
<!--                            <span slot="label"><i class="el-icon-add-location"></i>收件地址</span>-->
<!--                        </el-tab-pane>-->
                    </el-tabs>
                </div>
            </div>
        </div>
        <list-footer></list-footer>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListFooter from "@/components/list/Footer";
    import UserInfo from "@/components/user/Info";

    export default {
        name: "User",
        components: {
            ListFooter,
            ListHeader,
            UserInfo,
        },
        data(){
            var validateOldPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入原来的密码'));
                } else {
                    callback();
                }
            };
            var validateNewPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入新密码'));
                } else {
                    if (this.passwordForm.checkPass !== '') {
                        this.$refs.passwordRuleForm.validateField('checkNewPass');
                    }
                    callback();
                }
            };
            var validateNewPass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入新密码'));
                } else if (value !== this.passwordForm.newPass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return{
                dialogVisible:false,
                imageUrl:"",
                avatar:null,
                rules: {
                    oldPass: [
                        { validator: validateOldPass, trigger: 'blur' }
                    ],
                    newPass: [
                        { validator: validateNewPass, trigger: 'blur' }
                    ],
                    checkNewPass: [
                        { validator: validateNewPass2, trigger: 'blur' }
                    ],
                },

            }
        },
        computed:{
            userInfo(){
                return this.$store.state.userInfo;
            },
        },
        methods:{
            //关闭 头像对话框
            handleClose(){
                this.dialogVisible = false;
                this.imageUrl = "";
            },
            //取消上传头像
            cancel(){
               this.imageUrl = "";
            },
            //上传头像之前
            beforeAvatarUpload(file){
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            changeAvatar(file){
                console.log(file.raw);
                //获取头像文件
                this.avatar = file.raw;
                this.imageUrl = URL.createObjectURL(file.raw);
            },
            //上传头像
            uploadAvatar(){
                let formData = new FormData();
                formData.append('picFile',this.avatar);
                this.$axios.post("/api/user/uploadAvatar",formData).then((result) => {
                    result = result.data;
                    console.log(result);
                    if(result.status == 200){
                        this.dialogVisible = false;
                        this.imageUrl = "";

                        this.$message({
                            message:result.message,
                            type:"success",
                        });
                        //更新 vuex 中 state
                        this.$store.commit("changeUserInfo",result.result);
                        //更新缓存
                        sessionStorage.setItem("userInfo",this.$qs.stringify(result.result));
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .user{
        min-width: 1400px;
        padding-top: 10px;
        background-color: #E9EEF3;
        color: #333;
    }
    .user-container{
        width: 1100px;
        margin: 0 auto;
        padding-bottom: 50px;
    }
    .user-set{
        height: 60px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(29, 33, 35, 0.2);
    }
    .user-set-logo{
        float: left;
        margin-top: 10px;
        margin-right: 10px
    }
    .user-set-title{
        float: left;
        margin-top: 20px;
    }
    .user-info{
        height: 200px;
        border: 1px solid #e4e4e4;
        background-color: white;
        padding-bottom: 20px;
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    }
    .face-img-area{
        position: relative;
        width: 100%;
        background-color:#d81e06e6;
        height: 50%;
        float: left;
        /*border: 1px solid red;*/
    }
    .update-faceImg{
        cursor: pointer;
        position: absolute;
        text-align: center;
        left: 54px;
        bottom: -69px;
        padding: 0;
        width: 60px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        color: white;
        background-color: #00000099;
    }
    .update-faceImg .el-button:focus{
        color: white !important;
        background-color: #00000099 !important;
    }
    .update-faceImg .el-button{
        color: white !important;
    }
    .update-faceImg:hover{
        color: red;
        background-color: white;
    }
    .face-img-area img{
        width: 120px;
        height: 120px;
        border-radius: 50%;
        margin: 25px;
        /*box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
    }
    .face-img-area .nickname{
        position: absolute;
        top: 28px;
        left: 180px;
        color: white;
    }
    .face-img-area .update-self{
        position: absolute;
        top: 25px;
        right: 20px;
    }
    .user-data{
        float: left;
        text-align: left;
        padding:10px 150px;
        line-height: 15px;
        font-size: 14px;
    }
    .user-data p span{
        margin-right: 50px;
    }
    .user-center-con{
        margin-top: 20px;
    }
    .update-user-info{
        width: 400px;
    }
    .avatar-uploader{
        text-align: center;
    }
    .avatar-uploader .el-upload {
        /*border: 1px solid black;*/
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        border: 1px solid #cacdd2;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
        border-radius: 50%;
    }
    .avatar {
        width: 140px !important;
        height: 140px !important;
        display: block;
        border: 1px solid #a5a8b1;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .img-rule{
        padding: 0 75px;
        font-size: 13px;
        color: #777e86c2;
    }
    .update-password{
        width: 400px;
        margin-top: 20px;
    }
    .user-set{
        height: 65px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(29, 33, 35, 0.2);
    }
    .course-card{
        height: 114px;
        /*border: 1px solid goldenrod;*/
    }

    .course-card-lef{
        width: 200px;
        height: 100%;
        /*border: 1px solid red;*/
        float: left;
    }
    .course-card-lef img{
        width: 170px;
        height: 90px;
    }
    .course-card-right{
        float: left;
        width: 450px;
        height: 100%;
        /*border: 1px solid green;*/
    }
    .course-card-right p{
        margin:7px 0;
    }
    .course-card-right p span{
        margin-right: 14px;
    }
    .course-card-free{
        background-color:#f5f7fa;
        border-radius: 2px;
        width: 62px;
        height: 20px;
        text-align: center;
        font-size: 12px;
        color: #9199A1;
        margin-right: 12px;
        line-height: 20px;
    }
    .course-card-right .el-button{
        padding: 8px 11px !important;
        float: right;
    }
    .el-scrollbar__view li{
        padding-left: 20px;
    }
    .el-tabs--border-card >>> .el-tabs__content{
        padding-bottom: 100px !important;
    }
    .clear{
        clear: both;
    }
</style>