<template>
    <div class="home-container">
        <!-- 头部-->
        <home-header></home-header>
        <div class="home-content">
            <!--侧边栏和轮播图-->
            <home-slide :courseTypeList="courseTypeList">
            </home-slide>
            <!--课程列表-->
            <home-list
                    :newCourseList="newCourseList"
                    :freeCourseList="freeCourseList"
                    :payCourseList="payCourseList">
            </home-list>
        </div>
    </div>
</template>

<script>
    import HomeHeader from "@/components/home/Header";
    import HomeSlide from "@/components/home/Slide";
    import HomeList from "@/components/home/List";
    export default {
        name: "Home",
        data(){
            return{
                courseTypeList:[],
                newCourseList:[],
                freeCourseList:[],
                payCourseList:[],
            }
        },
        components:{
            HomeHeader,
            HomeSlide,
            HomeList,
        },
        methods:{
            getHomeInfo(){
                this.$axios.post("api/course/getHomeInfo").then((result) => {
                    let data = result.data;
                    console.log(data);
                    this.courseTypeList = data.result.courseTypeList;
                    let newCourseListRes = data.result.newCourseList;
                    let freeCourseListRes = data.result.freeCourseList;
                    let payCourseListRes = data.result.payCourseList;
                    if(newCourseListRes.length > 8){
                        this.newCourseList = newCourseListRes.splice(0,8);
                    }else{
                        this.newCourseList = newCourseListRes;
                    }
                    if(freeCourseListRes.length > 8){
                        this.freeCourseList = freeCourseListRes.splice(0,8);
                    }else{
                        this.freeCourseList = freeCourseListRes;
                    }
                    if(payCourseListRes.length > 8){
                        this.payCourseList = payCourseListRes.splice(0,8);
                    }else{
                        this.payCourseList = payCourseListRes;
                    }
                })
            }
        },
        mounted(){
            this.getHomeInfo();
        }
    }
</script>

<style scoped>
    .home-container{
        background-color: #E9EEF3;
    }
    .home-content{
        width: 1200px;
        margin: 0 auto;
    }
</style>