<template>
    <div>
        <list-header></list-header>
        <div class="top">
            <div class="top-container">
                <div class="path">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path :'/course/list'}">后端开发</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{path :'/course/list'}">初识Python</el-breadcrumb-item>
                        <el-breadcrumb-item>python</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="title">
                    <h2>初识Python</h2>
                </div>
                <div class="info">
                    <div class="teacher-info">
                        <div class="img">
                            <img src="../assets/imgs/defaultFace.jpg">
                        </div>
                        <div class="teacher-item">
                            <a>廖雪峰</a>
                            <br>
                            <a>前端开发工程师</a>
                        </div>
                        <div class="clear"></div>
                    </div>
                    <div class="course-info">
                        <ul class="top-ul-item">
                            <li class="top-li-item el-icon-s-opportunity">难度：初级</li>
                            <li class="top-li-item el-icon-s-marketing">时长：2小时</li>
                            <li class="top-li-item el-icon-s-custom">学习人数：3425435</li>
                        </ul>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <div class="menu">
            <div class="menu-container">
                <ul class="menu-ul">
                    <li :class="{on:0 == menuIndex}" class="menu-li" @click="handleMenu(0)">课程章节</li>
                    <li :class="{on:1 == menuIndex}" class="menu-li" @click="handleMenu(1)">问答讨论</li>
                    <li :class="{on:2 == menuIndex}" class="menu-li" @click="handleMenu(2)">用户评价</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    export default {
        name: "Detail",
        components: {
            ListHeader,
        },
        data(){
            return{
                menuIndex:0,
            }
        }
    }
</script>

<style scoped>
    .top{
        min-width: 1400px;
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
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
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
</style>