<template>
    <div>
        <list-header></list-header>
        <list-type
                :courseTypeList="courseTypeList"
                :typeId="typeId"
                ref="listType">
        </list-type>
        <div class="list-container">
            <list-course
                    :courseList="courseList"
                    :currentPage="currentPage"
                    :pageSize="pageSize"
                    :total="total"
                    @handleCurrentPageClick="handleCurrentPageClick">
            </list-course>
        </div>
        <list-footer></list-footer>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListType from "@/components/list/Type";
    import ListCourse from "@/components/list/Course";
    import ListFooter from "@/components/list/Footer";
    export default {
        name: "List",
        components:{
            ListFooter,
            ListHeader,
            ListType,
            ListCourse,
        },
        data(){
            return{
                courseTypeList:[],
                courseList:[],
                courseResult:{},
                //当前页码
                currentPage:1,
                //每页几条
                pageSize:2,
                //总条数
                total:0,
                typeId:0,
            }
        },
        methods:{
            //获取父组件List的数据
            getListInfo(){
                console.log(this.$route.params);
                this.typeId = parseInt(this.$route.params.id);
                let data = this.$qs.stringify({
                    isFree:1,
                    currentPage:this.currentPage,
                    pageSize:this.pageSize,
                });
                this.$axios.post("/api/course/getListInfo",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    data = result.result;
                    if(result.status == 200){
                        this.courseTypeList = data.courseTypeList;
                        this.courseList = data.courseList.list;
                        this.currentPage = data.courseList.pageNum;
                        this.total = data.courseList.total;
                    }
                })
            },
            //获取课程列表
            getCourse(){
                //父组件从子组件Type中获取数据
                let direction_index =  this.$refs.listType.direction_index;
                let type_index = this.$refs.listType.type_index;
                let rankList = this.$refs.listType.rankList;
                let rank_index = this.$refs.listType.rank_index;

                let ptId = direction_index == -1?0:direction_index;
                let ctId = type_index == -1?0:type_index;
                let rank = rankList[rank_index];

                let data = this.$qs.stringify({
                    ptId:ptId,
                    ctId:ctId,
                    rank:rank,
                    isFree:1,
                    currentPage:this.currentPage,
                    pageSize:this.pageSize,
                });
                this.$axios.post("/api/course/getCourse",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    this.courseList = result.result.list;
                    this.total = result.result.total;
                })

            },
            //改变页码
            handleCurrentPageClick(data){
                this.currentPage = data;
                this.getCourse();
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
        padding-bottom: 100px;
    }
</style>