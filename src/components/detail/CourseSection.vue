<template>
    <div class="course-section">
        <div class="course-desc section-box">
            简介：Python教程基础分《Python入门》和《Python进阶》两门课程，本视频教程是Python第一门课程，是Python开发的入门教程，
            将介绍Python语言的特点和适用范围，Python基本的数据类型，条件判断和循环，函数，以及Python特有的切片和列表生成式。
            希望本python教程能够让您快速入门并编写简单的Python程序。
        </div>
        <div class="course-chapters section-box">
            <h3>第1章 课程介绍</h3>
            <div class="chapter-desc">
                介绍Python的诞生，Python有什么独特的特点，它适合用在哪些地方，不适合用在哪些地方，以及Python在现实世界中的应用。
            </div>
            <ul class="video">
                <li>
                    <a class="el-icon-video-play"> 1-1 Python入门课程介绍 </a>
                    <!--未完成-->
<!--                    <i class="is-finish"><img src="../../assets/imgs/unfinished.png"></i>-->
<!--                    <i class="is-finish"><img src="../../assets/imgs/unfinished.png"></i>-->
                    <!--已完成-->
                    <i class="is-finish"><img src="../../assets/imgs/finished.png"></i>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseSection"
    }
</script>

<style scoped>
    .course-section{
        width: 800px;
        margin-top: 10px;
    }
    .section-box{
        line-height: 28px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 15px;
        margin-bottom: 8px;
        text-align: left;
    }
    .course-section-content .course-desc{
        font-size: 15px;
    }
    .course-chapters .course-chapters h3{
        font-size: 16px;
    }
    .course-chapters .chapter-desc{
        font-size: 14px;
        border-bottom: 1px solid #9ca8b533;
    }
    .course-chapters .video li{
        cursor: pointer;
        height: 47px;
        line-height: 47px;
        /*background-color: rgba(25,137,250,0.26);*/
        padding-left: 10px;
    }
    .course-chapters .video li:hover{
        background-color: rgba(25,137,250,0.26);
    }
    .course-chapters .video .is-finish{
        float: right;
        margin-right: 10px;
    }
    .el-icon-s-opportunity:before{
        color: #F56C6C;
    }
    .el-icon-s-marketing:before {
        color: #F56C6C;
    }
    .el-icon-s-custom:before{
        color: #F56C6C;
    }

    /*UserEvaluation用户评价*/
    .user-evaluation-content{
        width: 800px;
        margin-top: 10px;
        float: left;
    }
    .img-box{
        width: 40px;
        height: 40px;
        border-radius: 50%;
        float: left;
    }
    .img-box img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .content-box{
        padding:0 0 23px 54px;
    }
    .content-box .name{
        font-size: 14px;
        color: #787d82;
        font-weight:700;
    }
    .content-box .time{
        float:right;
        font-size: 13px;
        color:#b5b9bc;
        line-height: 35px;
    }
    .evaluation-input{
        padding-left: 54px;
        padding-top: 10px;
        text-align: right;
        position: relative;
    }
    .evaluation-input .num-tip{
        position: absolute;
        right: 16px;
        bottom: 64px;
        font-size: 12px;
        color: #b5b9bc;
        line-height: 20px;
    }

    /*分页*/
    .course-page{
        height: 47px;
        text-align: center;
        margin: 25px 0 auto;
    }
</style>