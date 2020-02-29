<template>
    <div class="top">
        <div class="back">
            <div class="back-icon">
                <i class="el-icon-back"></i>
            </div>
            <div class="chapter-name">1-1 Python入门课程介绍</div>
            <div class="clear"></div>
        </div>
        <div class="user-area">
            <div class="face-img-area">
                <el-popover
                        placement="top-start"
                        width="230"
                        trigger="hover">
                    <!--hover后显示的内容-->
                    <div class="hover-area" v-show="hoverArea">
                        <div class="self_area">
                            <div class="face-url">
                                <img style="width: 70px;height: 70px;border-radius: 50%;"
                                     :src="userInfo.faceImg">
                            </div>
                            <div class="username-role">
                                <p class="name">{{userInfo.nickname}}</p>
                                <p class="role">角色:{{userInfo.role}}</p>
                            </div>
                        </div>
                        <div class="my-area">
                            <ul>
                                <li class="el-icon-reading">我的课程</li>
                                <li class="el-icon-setting"><router-link to="/userInfo">个人设置</router-link></li>
                            </ul>
                        </div>
                        <div class="out">
                            <el-button type="primary" round @click="handleSignIn('login')">切换账号</el-button>
                            <el-button type="danger" round @click="logout">安全退出</el-button>
                        </div>
                    </div>
                    <el-button class="face-img-button" slot="reference">
                        <img style="width: 38px;height: 38px;border-radius: 50%;"
                             :src="userInfo.faceImg">
                    </el-button>
                </el-popover>
            </div>
        </div>
        <div class="clear"></div>
        <!--登录注册对话框-->
        <el-dialog
                title="white课堂"
                :visible.sync="dialogVisible"
                width="550px">
            <div>
                <sign-in :activeName="activeName"></sign-in>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import SignIn from "@/views/SignIn";
    export default {
        name: "VideoTop",
        components:{
            SignIn,
        },
        computed:{
          userInfo(){
              return this.$store.state.userInfo;
          }
        },
        data(){
            return{
                activeName:"",
                hoverArea:true,
                dialogVisible:false,
            }
        },
        methods:{
            handleSignIn(){
                this.dialogVisible = true;
                this.activeName = "login";
            },
            logout(){
                let data = this.$qs.stringify({
                    uId:this.$store.state.userInfo.id,
                });
                this.$axios.post("/api/user/logout",data).then((result) => {
                    result = result.data;
                    if(result.status == 200){
                        this.$message({
                            message:result.message,
                            type:"success",
                        });

                        //更改当前会话的登录状态和用户信息
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
                });

            }
        }
    }
</script>

<style scoped>
    .top{
        min-width: 1400px;
        height: 60px;
        line-height: 60px;
    }
    .back{
        width: 50%;
        height: 100%;
        float: left;
    }
    .back-icon{
        cursor: pointer;
        width: 70px;
        height: 100%;
        float: left;
        text-align: center;
    }
    .back-icon:hover{
        background-color: #dddfe299;
    }
    .el-icon-back{
        font-size: 25px;
    }
    .user-area{
        width: 100px;
        height: 100%;
        float: right;
        box-sizing: border-box;
    }
    .clear{
        clear: both;
    }
    .face-img-area{
        height: 40px;
        width: 40px;
        margin:10px;
        float:left;
        border-radius: 50%;
    }
    .el-popover__reference{
        padding:0 !important;
    }
    .hover-area{
        width:226px;
        height: 204px;
        /*border:1px solid red*/
    }
    .face-img-button{
        /*background: green;*/
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .self_area{
        width: 100%;
        height: 100px;
        border-bottom: 1px solid #868da230;
    }
    .face-url{
        width: 70px;
        height: 70px;
        border-radius: 50%;
        margin:14px;
        float: left;
    }
    .username-role{
        width: 70px;
        height: 100%;
        float: left;
        /*border: 1px solid black;*/
    }
    .username-role .name{
        margin-top: 35px;
    }
    .username-role .role{
        margin: 0;
        font-size: 12px;
        color: #8c939d;
    }
    .my-area{
        width: 100%;
        height: 50px;
        /*border: 1px solid rebeccapurple;*/
    }
    .my-area ul{
        width: 100%;
        height: 100%;
        padding:0;
        margin:0;
        line-height: 50px;
    }
    .my-area ul li{
        width: 79px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        /*border: 1px solid pink;*/
        float: left;
        margin: 6px 16px;
        list-style-type: none;
        cursor: pointer;
        font-size: 14px;
        background-color: #F8FAFC;
    }
    .my-area ul li:hover{
        background-color: #dddfe2;
    }
    .el-input{
        padding:0 !important;
    }
    .el-dialog__wrapper >>> .el-dialog__header{
        line-height: 22px !important;
    }
    .el-dialog__wrapper >>> .el-dialog__body{
        line-height: 44px !important;
        padding: 10px 0 0 0 !important;
    }
</style>