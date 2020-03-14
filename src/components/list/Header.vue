<template>
    <div class="header">
        <div class="header-container">
            <div class="header-link">
                <ul class="ul-items">
                    <router-link tag="li" to="/" :class="{on:link_index == 0}">white首页</router-link>
                    <router-link tag="li" to="/course/list/-1" :class="{on:link_index == 1}">免费课程</router-link>
                    <router-link tag="li" to="/course/payList/-1">实战课程</router-link>
                    <li @click="handleTeacherGroup" :class="{on:link_index == 2}">{{li_tag}}</li>
                    <router-link tag="li" to="/white">猿问猿答</router-link>>
                </ul>
            </div>
            <div class="header-search demo-input-suffix">
                <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search">
                </el-input>
            </div>
            <div class="header-signIn">
                <div class="login-area" v-show="isLogin == 'false'">
                    <el-button type="text" @click="handleSignIn('login')">登录</el-button>
                    <a>/</a>
                    <el-button type="text" @click="handleSignIn('register')">注册</el-button>
                </div>
                <div class="user-area" v-show="isLogin == 'true'">
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
                                        <router-link tag="li" class="el-icon-setting" to="/user/userInfo">个人设置</router-link>
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
                    <a class="logout" @click="logout">退出</a>
                </div>
            </div>
            <div class="header-bell">
                <div v-if="message == 0" class="bell">
                    <span class="el-icon-bell" @click="handleMessage">通知</span>
                </div>
                <div v-else class="bell">
                    <span class="message">{{message}}</span>
                    <span class="el-icon-bell" @click="handleMessage">通知</span>
                </div>
            </div>

        </div>
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
        name: "ListHeader",
        components:{
            SignIn,
        },
        data(){
            return{
                activeName:"",
                dialogVisible:false,
                hoverArea:true,
                link_index:0,
                message:0,
                li_tag:"加入讲师团",
            }
        },
        computed:{
            isLogin(){
                return this.$store.state.isLogin;
            },
            userInfo(){
                return this.$store.state.userInfo;
            }
        },
        methods:{
            //控制哪一个链接有样式
            handleLinkIndex(){
                console.log(this.$route.meta.headerIndex);
                this.link_index = this.$route.meta.headerIndex;
            },
            //处理登录、注册的转换
            handleSignIn(activeName){
                // console.log(sign);
                this.dialogVisible = true;
                this.activeName = activeName;
            },
            //退出
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

                        this.hoverArea = false;
                        this.$router.push("/");
                    }else{
                        this.$message({
                            message:result.message,
                            type:"error",
                        })
                    }
                });

            },
            //处理 加入讲师团
            handleTeacherGroup(){
                this.handleIsLogin("/course/teacherGroup");
            },
            //处理 通知
            handleMessage(){
                this.handleIsLogin("/user/message");
            },
            //未登录不能进入特定的页面
            handleIsLogin(path){
                if(this.$store.state.isLogin == 'true'){
                    this.$router.push(path);
                }else{
                    this.$message({
                        message:"请先进行登录！",
                        type:"error",
                    })
                }
            },
            //处理 不同角色，显示的标签不同
            handleLiTag(){
                if(this.$store.state.userInfo.role == "老师"){
                    this.li_tag = "创建课程";
                }
            }

        },
        mounted(){
            this.handleLinkIndex();
            this.handleLiTag();
            if(this.$store.state.isLogin == null){
                this.$store.state.isLogin = "false";
            }
        }
    }
</script>

<style scoped>
    .header{
        min-width: 1400px;
        height: 44px;
        line-height: 44px;
        background-color: black;
    }
    .header-container{
        width: 1300px;
        height: 100%;
        margin: 0 auto;
    }
    .header-link{
        height: 100%;
        width: 50%;
        float: left;
    }
    .ul-items{
        padding: 0;
        margin: 0;
        width: 100%;
        height:100%;
        line-height: 40px;

    }
    .ul-items li{
        line-height: 44px;
        margin-right: 50px;
        float: left;
        font-size: 15px;
        color: gray;
        cursor: pointer;
    }
    .ul-items li:hover{
        color: white;
    }
    .on{
        color: white;
    }
    .header-search{
        width: 307px;
        float: left;
    }
    .header-search >>> .el-input{
        padding: 0 !important;
    }
    .header-bell{
        font-size: 15px;
        float: right;
        width: 86px;
        height: 44px;
        line-height: 44px;
        text-align: center;
        cursor: pointer;
        color: white;
        box-sizing: border-box;
        position: relative;
    }
    .bell{
        height: 32px;
        line-height: 32px;
        margin: 5px 10px;
        border-radius: 10%;
    }
    .bell:hover{
        background-color: white;
        color: red;
    }
    .bell:hover .message{
        color: white;
    }
    .message{
        width: 27px;
        height: 18px;
        line-height: 18px;
        font-size: xx-small;
        background-color: #f56c6c;
        border-radius:10px;
        position: absolute;
        top: 0;
        right: 0;
    }
    .header-signIn{
        color: white;
        float: right;
        padding:0 20px;
        cursor: pointer;
    }
    .login-area >>> .el-button--text{
        color: white;
        font-size: 16px;
        padding: 0 10px;
    }
    .login-area >>> .el-button--text:hover{
        color: red;
    }
    .el-dialog__wrapper >>> .el-dialog__body{
        padding: 10px 0 0 0 !important;
    }
    .face-img-area{
        height: 40px;
        width: 40px;
        float:left;
        border-radius: 50%;
    }
    .el-popover__reference{
        padding:0 !important;
    }
    .hover-area{
        width:226px;
        height: 204px;
    }
    .face-img-button{
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
    .hover-area .out{
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-top: 1px solid #868da230;
        text-align: left;
    }
    .hover-area .out button{
        cursor: pointer;
        padding: 10px;
        margin:0 17px;
    }
    .logout{
        margin-left: 20px;
        float: right;
    }
    .logout:hover{
        cursor: pointer;
        color: red;
    }
    .el-dialog__wrapper >>> .el-dialog__header{
        line-height: 22px !important;
    }
</style>