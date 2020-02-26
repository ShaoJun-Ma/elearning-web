<template>
    <div>
        <div class="course">
            <div class="course-item" v-for="item of courseList" :key="item.id">
                <div class="course-item-img">
                    <img class="course-img" :src="item.course.coverImg">
                    <a class="course-type">{{item.courseTypeName}}</a>
                </div>
                <div class="course-item-desc">
                    <router-link class="course-name" to="" tag="span">
                        {{item.course.name}}
                    </router-link>
                    <p class="course-row">
                        <span class="rank">{{item.course.rank}}</span>
                        <span class="learn-counts el-icon-user">{{item.course.learnCounts}}</span>
                    </p>
                    <span class="description">{{item.course.description}}</span>
                    <p class="course-item-bottom">
                        <span class="free">免费</span>
                    </p>
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <!--分页-->
        <div class="course-page">
            <el-pagination
                    background
                    @current-change="pageChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>

</template>

<script>
    export default {
        name: "ListCourse",
        props:{
            courseList:Array,
            //当前页码
            currentPage:Number,
            //每页显示几条
            pageSize:Number,
            //总条数
            total:Number,
        },
        methods:{
            //改变页码
            pageChange(data){
                this.$emit("handleCurrentPageClick",data);
            }
        },

    }
</script>

<style scoped>
    .course{
        width: 100%;
        padding-bottom: 60px;
    }
    .course-item{
        width: 215px;
        float: left;
        margin-left: 11px;
        margin-right: 12px;
        margin-top: 27px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .course-item-img{
        position: relative;
    }
    .course-img{
        width: 215px;
        height: 122px;
        border-radius: 13px;
    }
    .course-type{
        height: 23px;
        line-height: 23px;
        padding:0 8px;
        left: 8px;
        top: 91px;
        background-color: black;
        opacity: 0.5;
        color: white;
        position: absolute;
        border: 1px solid #3e3434;
        border-radius: 5px;
        font-size: 13px;
    }
    .course-item-desc{
        width: 198px;
        height: 155px;
        padding: 8px;
        position: relative;
    }
    .course-name{
        height: 46px;
        line-height: 23px;
        font-size: 16px;
        font-weight: bolder;
        display: block;
        text-align: left;
        cursor: pointer;
    }
    .course-name:hover{
        color: red;
    }
    .course-row{
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
    .description{
        display: block;
        font-size: 13px;
        text-align: left;
        line-height: 17px;
        color: #9199A1;
    }
    .free{
        font-size: 13px;
        float: left;
        color: #e8690e;
    }
    .course-item-bottom{
        height: 18px;
        position: absolute;
        margin: 0;
        bottom: 7px;
        width: 92%;
    }
    .clear{
        clear: both;
    }
    .course-page{
        text-align: center;
    }
</style>