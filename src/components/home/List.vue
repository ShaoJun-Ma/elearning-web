<template>
    <div class="list">
        <!--新上好课-->
        <div class="new-course-list">
            <span class="list-title">新上好课</span>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) of newCourseList" :key="index">
                    <div class="grid-content bg-purple">
                        <div class="item-img-info">
                            <div class="item-sign">
                                新课
                            </div>
                            <img class="item-img" :src="item.course.coverImg">
                            <a class="item-type" type="info">{{item.courseTypeName}}</a>
                        </div>
                        <div class="item-desc-info">
                            <router-link to="/" tag="span" class="item-name new-item-name">
                                {{item.course.name}}
                            </router-link>
                            <div class="item-desc">
                                <span class="price">￥{{item.course.price | numFilter}}</span>
                                <span class="rank">{{item.course.rank}}</span>
                                <span class="learn-counts el-icon-user">{{item.course.learnCounts}}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--免费课程-->
        <div class="free-course-list">
            <span class="list-title">免费课程</span>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) of freeCourseList" :key="index">
                    <div class="grid-content bg-purple free-bg-purple">
                        <div class="item-img-info">
                            <img class="item-img" :src="item.course.coverImg">
                            <a class="item-type" type="info">{{item.courseTypeName}}</a>
                        </div>
                        <div class="item-desc-info">
                            <router-link to="/" tag="span" class="item-name new-item-name">
                                {{item.course.name}}
                            </router-link>
                            <div class="item-desc">
                                <span class="free">免费</span>
                                <span class="rank">{{item.course.rank}}</span>
                                <span class="learn-counts el-icon-user">{{item.course.learnCounts}}</span>
                            </div>
                            <div class="desc">{{item.course.description}}</div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--实战课程-->
        <div class="pay-course-list">
            <span class="list-title">实战课程</span>
            <el-row :gutter="20">
                <el-col :span="6" v-for="(item,index) of payCourseList" :key="index">
                    <div class="grid-content bg-purple">
                        <div class="item-img-info">
                            <img class="item-img" :src="item.course.coverImg">
                            <a class="item-type" type="info">{{item.courseTypeName}}</a>
                        </div>
                        <div class="item-desc-info">
                            <router-link to="/" tag="span" class="item-name new-item-name">
                                {{item.course.name}}
                            </router-link>
                            <div class="item-desc">
                                <span class="price">￥{{item.course.price | numFilter}}</span>
                                <span class="rank">{{item.course.rank}}</span>
                                <span class="learn-counts el-icon-user">{{item.course.learnCounts}}</span>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeList",
        props:{
            newCourseList:Array,
            freeCourseList:Array,
            payCourseList:Array,
        },
        filters:{
            numFilter(num) {
                let n = 2;
                var f = parseFloat(num);
                if(isNaN(f)){
                    return false;
                }
                f = Math.round(num*Math.pow(10, n))/Math.pow(10, n); // n 幂
                var s = f.toString();
                var rs = s.indexOf('.');
                //判定如果是整数，增加小数点再补0
                if(rs < 0){
                    rs = s.length;
                    s += '.';
                }
                while(s.length <= rs + n){
                    s += '0';
                }
                return s;
            }
        }
    }
</script>

<style scoped>
    .list{
        margin-top: 20px;
        width: 100%;
        padding-bottom: 50px;
    }
    .bg-purple {
        height: 270px !important;
        margin-top: 20px;
        background: #E9EEF3;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .free-bg-purple{
        height: 300px !important;
    }
    .new-course-list,.free-course-list,.pay-course-list{
        width: 1200px;
        margin: 0 auto;
        border-radius: 4px;
        padding-top: 15px;
    }
    .item-img-info{
        width: 270px;
        margin-left: 6px;
        height: 170px;
        position: relative;
    }
    .list-title{
        border-bottom: 1px solid #b5c2ce;
        font-weight: bolder;
        font-size: 23px;
        display: block;
        text-align: left;
        padding-left: 10px;
        line-height: 50px;
    }
    .item-desc-info{
        padding:0 10px;
    }
    .item-type{
        height: 27px;
        line-height: 27px;
        padding:0 8px;
        left: 4px;
        top: 122px;
        background-color: black;
        opacity: 0.5;
        color: white;
        position: absolute;
        border: 1px solid #3e3434;
        border-radius: 5px;
        font-size: 13px;
    }
    .item-img{
        width: 270px;
        height: 147px;
        border-radius: 13px;
        margin-top: 8px;
    }
    .item-name{
        display: block;
        text-align: left;
        line-height: 23px;
        font-weight: bolder;
    }
    .item-name,.pay-card-name{
        height: 48px;
        cursor: pointer;
    }
    .item-name:hover{
        color: red;
    }
    .item-desc{
        line-height: 12px;
        height: 12px;
        text-align: left;
        margin: 12px 0;
    }
    .rank,.learn-counts{
        font-size: 13px;
        color: #9199A1;
        line-height: 10px;
        margin-right: 10px;
    }
    .learn-counts{
        float: right;
        margin-right: 5px;
    }
    .price{
        font-size: 14px;
        color: red;
        font-weight: bold;
        line-height: 10px;
        margin-right: 10px;
    }
    .free{
        font-size: 14px;
        color: #e8690e;
        font-weight: bold;
        line-height: 10px;
        margin-right: 10px;
    }
    .item-sign{
        top: 18px;
        left: -5px;
        position: absolute;
        width: 40px;
        height: 22px;
        font-size: 14px;
        color: white;
        text-align: center;
        line-height: 22px;
        border: 2px solid white;
        background-color: #e54609;
        border-radius: 25px;
    }
    .course-stat-new span{
        font-size: 8px;
        color: white;
    }
    .desc{
        display: block;
        font-size: 13px;
        text-align: left;
        line-height: 17px;
        color: #9199A1;
    }


</style>