<template>
    <div>
        <list-header></list-header>
        <div class="top">
            <div class="top-container">
                <div class="path">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path :'/course/list'}">{{courseType.ptName}}</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path :'/course/list'}">{{courseType.ctName}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{course.name}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="title">
                    <h2>{{course.name}}</h2>
                </div>
                <div class="info">
                    <div class="teacher-info">
                        <div class="img">
                            <img :src="author.faceImg">
                        </div>
                        <div class="teacher-item">
                            <a>{{author.nickname}}</a>
                            <br>
                            <a>{{author.job}}</a>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="course-info">
                        <ul class="top-ul-item">
                            <li class="top-li-item el-icon-s-opportunity">难度：{{course.rank}}</li>
                            <li class="top-li-item el-icon-s-marketing">时长：{{courseDetail.time}}</li>
                            <li class="top-li-item el-icon-s-custom">学习人数：{{course.learnCounts}}</li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <!-- 菜单栏-->
        <div class="menu">
            <div class="menu-container">
                <ul class="menu-ul">
                    <li :class="{on:0 == menuIndex}" class="menu-li" @click="handleMenuClick(0)">课程章节</li>
                    <li :class="{on:1 == menuIndex}" class="menu-li" @click="handleMenuClick(1)">问答讨论</li>
                    <li :class="{on:2 == menuIndex}" class="menu-li" @click="handleMenuClick(2)">用户评价</li>
                </ul>
            </div>
        </div>
        <div class="list">
            <div class="list-container">
                <div class="list-left">
                    <!-- 课程章节 -->
                    <course-section
                            v-show="menuIndex == 0"
                            :courseDetail="courseDetail"
                            :courseChapterList="courseChapterList">
                    </course-section>
                    <!-- 问答讨论 -->
                    <question-discussion v-show="menuIndex == 1">
                    </question-discussion>
                    <!-- 用户评价 -->
                    <user-evaluation
                            v-show="menuIndex == 2"
                            :evaluationList="evaluationList"
                            ref="userEvaluation"
                            @handleCurrentPageClick="handleCurrentPageClick">
                    </user-evaluation>
                </div>
                <div class="list-right">
                    <div class="aside-info">
                        <div v-if="isLogin == 'false'">
                            <div class="start-learn">
                                <el-button type="danger" round @click="handleStartLearnClick()">开始学习</el-button>
                            </div>
                        </div>
                        <div v-if="isLogin == 'true'">
<!--                            <div class="learn-info">-->
<!--                                <span class="learn">已学70%</span>-->
<!--                                <span class="learn-time">学习耗时19小时33分</span>-->
<!--                                <el-progress :text-inside="true" :stroke-width="26" :percentage="70"></el-progress>-->
<!--                            </div>-->
                            <div class="continue-info">
                                <span>上次学至 1-1Python入门课程介绍</span>
                                <el-button type="primary" round>继续学习</el-button>
                            </div>
                        </div>
                        <div class="tip-info">
                            <dl class="tip-dl">
                                <dt class="tip-dt">课程须知</dt>
                                <dd class="tip-dd">{{courseDetail.tip}}</dd>
                            </dl>
                            <dl class="tip-dl">
                                <dt class="tip-dt">老师告诉你能学到什么？</dt>
                                <dd class="tip-dd">{{courseDetail.learn}}</dd>
                            </dl>
                        </div>
                    </div>
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
    import CourseSection from "@/components/detail/CourseSection";
    import QuestionDiscussion from "@/components/detail/QuestionDiscussion";
    import UserEvaluation from "@/components/detail/UserEvaluation";
    export default {
        name: "Detail",
        components: {
            ListFooter,
            UserEvaluation,
            QuestionDiscussion,
            CourseSection,
            ListHeader,
        },
        data(){
            return{
                menuIndex:0,
                author:{},
                courseType:[],
                course:{},
                courseDetail:{},
                courseChapterList:[],
                evaluationList:{},
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
            //菜单切换
            handleMenuClick(index){
                this.menuIndex = index;
                if(index == 1){
                    this.getDiscussion();
                }
                if(index == 2){
                    this.getEvaluation();
                }
            },
            //获取课程详情的数据
            getDetailInfo(){
                let data = this.$qs.stringify({
                    cId:this.$route.params.id,
                    uId:this.userInfo.id,
                });
                this.$axios.post("/api/course/getDetailInfo",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    data = result.result;
                    this.courseType = data.courseType;
                    this.author = data.author;
                    this.course = data.course;
                    this.courseDetail = data.courseDetail;
                    this.courseChapterList = data.courseChapterList;
                })
            },
            //获取问答讨论
            getDiscussion(){
                this.$axios.post("/api/course/getDiscussion").then((result)=>{
                    result = result.data;
                    console.log(result);
                })
            },
            //获取用户评价
            getEvaluation(){
                let userEvaluation = this.$refs.userEvaluation;
                let currentPage = userEvaluation.currentPage;
                let pageSize = userEvaluation.pageSize;
                let data = this.$qs.stringify({
                    cId:this.$route.params.id,
                    currentPage:currentPage,
                    pageSize:pageSize,
                });
                this.$axios.post("/api/course/getEvaluation",data).then((result)=>{
                    result = result.data;
                    console.log(result);
                    this.evaluationList = result.result;
                    userEvaluation.total = result.result.total;
                    userEvaluation.pageSize = result.result.pageSize;
                })
            },
            //切换评论的页码
            handleCurrentPageClick(data){
                console.log(data);
                this.$refs.userEvaluation.currentPage = data;
                this.getEvaluation();
            },
            //点击开始学习
            handleStartLearnClick(){
                if(this.isLogin == "false"){
                    this.$message({
                        message:"请先登录后才能进行学习！",
                        type:"error",
                    })
                }else{
                    this.$router.push("/course/video/");
                }
            }
        },
        mounted(){
            this.getDetailInfo();
        }
    }
</script>

<style scoped>
    .top{
        min-width: 1400px;
        background-color: #E9EEF3;
    }
    .top-container{
        width: 1200px;
        margin: auto;
        padding-bottom: 20px;
    }
    .path{
        padding: 18px 0;
    }
    .path .el-breadcrumb{
        font-size: 13px;
        height: 35px;
        line-height: 35px;
    }
    .title{
        height: 50px;
        line-height: 50px;
        text-align: left;
        padding-bottom: 20px;
    }
    .title h2{
        margin: 0;
    }
    .info{
        height: 50px;
    }
    .teacher-info{
        width: 200px;
        height: 100%;
        float: left;
        padding: 0 20px;
    }
    .clear{
        clear: both;
    }
    .img{
        width: 50px;
        height: 50px;
        line-height: 75px;
        text-align:left;
        float: left;
    }
    .img img{
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    .teacher-item{
        width: 140px;
        height: 40px;
        float: left;
        line-height: 22px;
        text-align: left;
        font-size: 14px;
        padding:5px;
    }
    .course-info{
        width: 550px;
        height: 50px;
        float: left;
    }
    .top-ul-item{
        width: 100%;
        height: 100%;
    }
    .top-li-item{
        float: left;
        line-height: 50px;
        margin:0 23px;
    }
    .menu{
        min-width: 1400px;
        height: 67px;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .menu-container{
        width: 1200px;
        height: 67px;
        line-height: 67px;
        margin:0 auto;
    }
    .menu-ul{
        width: 100%;
        height: 100%;
    }
    .menu-li{
        width: 70px;
        height: 40px;
        line-height: 40px;
        cursor: pointer;
        text-align: center;
        float: left;
        font-weight: bolder;
        padding:0 10px;
        margin:13px 20px;
    }
    .on{
        color: red;
        border-bottom: 2px solid red;
        font-weight: bold;
    }
    .list{
        min-width: 1400px;
        background-color:#E9EEF3;
    }
    .list-container{
        width: 1170px;
        margin: 0 auto;
        padding: 30px 30px 100px;
    }
    .list-left{
        width:800px;
        float: left;
    }
    .list-right{
        width: 330px;
        float: left;
        margin-left: 35px;
    }
    .el-icon-s-opportunity:before,.el-icon-s-marketing:before,.el-icon-s-custom:before{
        color: #F56C6C;
    }

    .aside-info{
        width: 94%;
        background-color: white;
        border-radius: 10px;
        padding: 10px;
    }
    .start-learn{
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
    .start-learn .el-button{
        width: 267px !important;
    }
    .learn-info{
        line-height: 30px;
        font-size: 13px;
    }
    .learn{
        float: left;
        font-size: 14px;
        font-weight: bolder;
    }
    .learn-time{
        float: right;
    }
    .continue-info{
        margin-top: 10px;
        line-height: 30px;
        font-size: 13px;
        text-align: center;
    }
    .continue-info .el-button{
        width: 267px;
    }
    .tip-info{
        margin-top: 10px;
        line-height: 21px;
        text-align: left;
    }
    .tip-dl{
        margin: 0;
        padding:10px 20px;
    }
    .tip-dt{
        font-weight: bolder;
        padding: 5px 0;
    }
    .tip-dd{
        color: #545c63;
        margin: 0;
        font-size: 14px;
    }
</style>