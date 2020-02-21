<template>
    <div class="type">
        <div class="top">
            <div class="type-search">
                <div class="logo">
                    <img class="logo-img" src="../../assets/imgs//player.png">
                    <h3>免费课程</h3>
                </div>
                <div class="demo-input-suffix search">
                    <el-input
                        placeholder="请输入内容"
                        prefix-icon="el-icon-search">
                    </el-input>
                </div>
            </div>
            <!--方向（父级类型）-->
            <div class="course-direction">
                <span class="classify">方向：</span>
                <ul class="type-ul">
                    <li class="type-item on">全部</li>
                    <div v-for="item in parentCourseTypeList" :key="item.id">
                        <li class="type-item">{{item.name}}</li>
                    </div>
                </ul>
            </div>
            <!--分类（子级类型）-->
            <div class="course-type">
                <span class="classify">分类：</span>
                <ul class="type-ul">
                    <li  class="type-item on">全部</li>
                    <div v-for="item in childCourseTypeList" :key="item.id">
                        <li class="type-item">{{item.name}}</li>
                  </div>
                </ul>
            </div>
            <!--难度-->
            <div class="course-rank">
                <span class="classify">难度：</span>
                <ul class="type-ul">
                    <div v-for="(r_item,index) in rankList" :key="index">
                        <li class="type-item" :class="{on:index==rank_index}" @click="changeRank(index)">{{r_item}}</li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListType",
        props:{
            parentCourseTypeList:Array,
            childCourseTypeList:Array,
        },
        data(){
            return{
                rankList:["全部","初级","中级","高级"],
                rank_index:0,
            }
        }
    }
</script>

<style scoped>
    .type{
        width: 100%;
        height: 448px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .top{
        width: 1200px;
        height: 448px;
        margin: auto;

    }
    .type-search{
        width: 100%;
        height: 90px;
        border-bottom:1px solid rgba(29, 33, 35, 0.2);
    }
    .logo{
        float: left;
        width: 40%;
        height: 80%;
        margin-top: 12px;
    }
    .logo-img{
        float: left;
        margin-top: 10px;
        margin-right: 10px
    }
    .search{
        float: left;
        width: 40%;
        height: 50%;
        margin-top: 32px;
        margin-left: 236px;
    }
    .course-direction{
        width: 100%;
        height: 65px;
        border-bottom:1px solid rgba(29, 33, 35, 0.2);;
    }
    .classify{
        float: left;
        margin-top: 22px;
        font-weight: bolder;
    }
    .type-ul{
        float: left;
        width: 95%;
        margin: 16px 0;
    }
    .type-item{
        /*border: 1px solid red;*/
        height: 25px;
        line-height: 25px;
        text-align: center;
        padding:5px 10px;
        margin:1px 5px;
        font-size: 14px;
        cursor: pointer;
    }
    .type-item:hover{
        color: red;
    }
    .course-type{
        width: 100%;
        height: 194px;
        border-bottom:1px solid rgba(29, 33, 35, 0.2);
    }

    .course-rank{
        width: 100%;
        height: 65px;
        border-bottom:1px solid rgba(29, 33, 35, 0.2);;
    }
    .on{
        background-color:#f2130d0f;
        border-radius: 6px;
        font-weight: 700;
        color: red;
    }

</style>