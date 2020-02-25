<template>
    <div>
        <list-header></list-header>
        <list-type
                :courseTypeList="courseTypeList"
                @changeChildType="changeChildType"
                @changeCourse="changeCourse">
        </list-type>
        <div class="list-container">
            <list-course :courseList="courseList"></list-course>
        </div>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListType from "@/components/list/Type";
    import ListCourse from "@/components/list/Course";
    export default {
        name: "List",
        components:{
            ListHeader,
            ListType,
            ListCourse,
        },
        data(){
            return{
                courseTypeList:[],
                courseList:[],
            }
        },
        methods:{
            getListInfo(){
                let data = this.$qs.stringify({
                   isFree:1,
                });
                this.$axios.post("/api/course/getListInfo",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    if(result.status == 200){
                        this.courseTypeList = result.result.courseTypeList;
                        this.courseList = result.result.courseList;
                    }
                })
            },
            changeChildType(data){
                this.childCourseTypeList = data;
            },
            changeCourse(data){
                this.courseList = data;
            }
        },
        mounted(){
            this.getListInfo();
        }
    }
</script>

<style scoped>
    .list-container{
        width: 1200px;
        margin: 0 auto;
        padding-bottom: 30px;
        border: 1px solid red;
    }
</style>