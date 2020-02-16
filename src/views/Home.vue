<template>
    <div class="home-container">
        <home-header></home-header>
        <div class="home-content">
            <home-slide :courseTypeList="courseTypeList"></home-slide>
        </div>
    </div>
</template>

<script>
    import HomeHeader from "@/components/home/Header";
    import HomeSlide from "@/components/home/Slide"
    export default {
        name: "Home",
        data(){
            return{
                courseTypeList:[]
            }
        },
        components:{
            HomeHeader,
            HomeSlide,
        },
        methods:{
            getHomeInfo(){
                this.$axios.post("api/course/getHomeInfo").then((result) => {
                    let data = result.data;
                    console.log(data);
                    this.courseTypeList = data.result.courseTypeDTOS;
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
        border: 1px solid red;
    }
</style>