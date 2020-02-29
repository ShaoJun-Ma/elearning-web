<template>
    <div class="side">
        <div class="side-left">
            <ul class="side-ul">
                <li class="slide-li">
                    <i class="el-icon-document"></i>
                    <span @click="handleChapterClick">章节</span>
                </li>
            </ul>
        </div>
        <div class="video-chapter" v-show="isCourseChapter == true">
            <ul class="chapter-ul" v-for="p_item in chapterList" :key="p_item.id">
                <span class="parent-chapter">{{p_item.title}}</span>
                <li class="chapter-li" v-for="item in p_item.childChapterList" :key="item.id">
                    {{item.title}}
                    <span class="el-icon-warning li-right" v-show="ccId != item.id"></span>
                    <span class="learning li-right" v-show="ccId == item.id">正在学</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VideoSide",
        data(){
            return{
                isCourseChapter:false,
                chapterList:[],
                ccId:this.$route.params.id,
            }
        },
        methods:{
            handleChapterClick(){
                this.isCourseChapter = !this.isCourseChapter;
            },
            getChapter(){
                let data = this.$qs.stringify({
                    cdId:1,
                });
                this.$axios.post("/api/course/getChapter",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    if(result.status == 200){
                        this.chapterList = result.result;
                    }
                })
            }
        },
        mounted(){
            this.getChapter();
        }
    }
</script>

<style scoped>
    .side{
        width: 100%;
        height: 300px;
    }
    .side-left{
        width: 100%;
        height: 100%;
    }
    .side-ul{
        width: 100%;
        height: 100%;
    }
    .slide-li{
        padding: 10px 0;
        cursor: pointer;
        width: 100%;
        height: 50px;
        text-align: center;
        color: grey;
    }
    .slide-li:hover{
        color: white;
    }
    .el-icon-document{
        font-size: 22px;
        display: block;
    }
    .video-chapter{
        width: 350px;
        height: 778px;
        left:71px;
        top: 0;
        position: absolute;
        border-left: 1px solid #8c939aad;
        background-color: black;
        z-index: 1;
        overflow: scroll;
        overflow-x: hidden;
        padding: 10px 5px;
    }
    .chapter-ul{
        text-align: left;
        color: #9199A1;
    }
    .parent-chapter{
        color:#ffffffcc;
        font-weight: bolder;
        line-height: 30px;
        padding: 0 5px;
    }
    .chapter-li{
        width: 92%;
        cursor: pointer;
        font-size: 14px;
        position: relative;
        line-height: 30px;
        padding: 0 15px;
    }
    .chapter-li:hover{
        color: white;
    }

    .chapter-li .li-right{
        color: #ff000080;
        position: absolute;
        right: 10px;
        line-height: 30px;
    }
    .chapter-li:hover .li-right{
        color: red;
    }
    .learning{
        font-weight: bolder;
    }
</style>