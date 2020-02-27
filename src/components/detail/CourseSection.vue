<template>
    <div class="course-section">
        <div class="course-desc section-box">
           介绍：{{courseDetail.introduction}}
        </div>
        <div class="course-chapters section-box" v-for="p_item of courseChapterList" :key="p_item.id">
            <h3 class="headline">{{p_item.title}}</h3>
            <div class="chapter-desc">
                {{p_item.introduction}}
            </div>
            <div class="chapter-items">
                <ul class="chapter-ul">
                    <li class="chapter-li" v-for="item of p_item.childChapterList" :key="item.id">
                        <a class="subhead el-icon-video-play">1{{item.title}} </a>
                        <!--已完成-->
<!--                        <span class="is-finish"><img src="../../assets/imgs/finished.png"></span>-->
                        <!--未完成-->
                        <span class="is-finish"><img src="../../assets/imgs/unfinished.png"></span>
<!--                        <span class="is-finish"><img src="../../assets/imgs/unfinished.png"></span>-->
                    </li>
                    <div class="clear"></div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CourseSection",
        props:{
            courseChapterList:Array,
            courseDetail:Array,
        }
    }
</script>

<style scoped>
    .course-section{
        width: 100%;
    }
    .section-box{
        line-height: 28px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 15px;
        margin-bottom: 10px;
    }
    .course-chapters{
        width: 800px;
        box-sizing: border-box;
    }
    .course-desc{
        font-size: 15px;
    }
    .headline{
        font-size: 16px;
        margin: 10px 0;
    }
    .chapter-items{
        width: 100%;
        padding: 10px 0;
    }
    .chapter-ul{
        width: 100%;
    }
    .chapter-desc{
        font-size: 14px;
        padding-bottom: 10px;
        border-bottom: 1px solid #9ca8b533;
    }
    .chapter-li{
        cursor: pointer;
        height: 47px;
        width: 99%;
        line-height: 47px;
        padding-left: 10px;
    }
    .chapter-li:hover{
        background-color: rgba(255,0,0,0.12);
    }
    .chapter-li:hover .el-icon-video-play{
        color: red;
    }
    .is-finish{
        float: right;
        margin-right: 10px;
    }
    .clear{
        clear: both;
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


</style>