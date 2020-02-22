<template>
    <div>
        <list-header></list-header>
        <list-type
                :parentCourseTypeList="parentCourseTypeList"
                :childCourseTypeList="childCourseTypeList">
        </list-type>
        <div class="list-container">

        </div>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListType from "@/components/list/Type";
    export default {
        name: "List",
        components:{
            ListHeader,
            ListType,
        },
        data(){
            return{
                parentCourseTypeList: [],
                childCourseTypeList:[],
            }
        },
        methods:{
            getListInfo(){
                this.$axios.post("/api/course/getListInfo").then((result) => {
                    result = result.data;
                    console.log(result);
                    if(result.status == 200){
                        this.parentCourseTypeList = result.result.parentCourseTypeList;
                        this.childCourseTypeList = result.result.childCourseTypeList;
                    }
                })
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