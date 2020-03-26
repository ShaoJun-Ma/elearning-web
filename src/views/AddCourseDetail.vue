<template>
    <div>
        <list-header></list-header>
        <div class="addCourseDetail">
            <div class="addCourseDetail-container">
                <div class="add-set">
                    <img class="add-set-logo" src="../assets/imgs/addCourseDetail-set.png">
                    <h3 class="add-set-title">完善课程详情</h3>
                    <div class="clear"></div>
                </div>
                <div class="course-container">
                    <div class="course-info" ref="courseInfo">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="课程名称:">
                                <a>aaa</a>
                            </el-form-item>
                            <el-form-item label="介绍:">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        maxlength="300"
                                        placeholder="请输入课程介绍"
                                        v-model="textarea"
                                        show-word-limit>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="课程须知:">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        maxlength="300"
                                        placeholder="请输入课程须知"
                                        v-model="textarea"
                                        show-word-limit>
                                </el-input>
                            </el-form-item>
                            <el-form-item label="学习掌握:">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        maxlength="200"
                                        placeholder="请将学习到什么内容"
                                        v-model="textarea"
                                        show-word-limit>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="submit" type="danger" @click="submitForm('form')">取消创建</el-button>
                                <el-button class="submit" type="primary" @click="submitForm('form')">创建课程详情</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <list-footer></list-footer>
    </div>

</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListFooter from "@/components/list/Footer";
    export default {
        name: "AddCourse",
        components: {ListFooter, ListHeader},
        data(){
            return{
                form:{
                    name:"",
                    rank:"",
                    isFree:0,
                    price:"",
                },
                textarea:"",
                options:[],
            }
        },
        methods:{
            getOptions(){
                this.$axios.post("/api/course/getCourseTypeOptions").then((result)=>{
                    result = result.data;
                    if(result.status == 200){
                        this.options = result.result;
                    }
                })
            },
        },
        mounted(){
            this.getOptions();
        }
    }
</script>

<style scoped>
    .addCourseDetail{
        min-width: 1400px;
        padding-top: 10px;
        background-color: #E9EEF3;
        color: #333;
    }
    .addCourseDetail-container{
        width: 1100px;
        margin: 0 auto;
        padding-bottom: 100px;
    }
    .add-set{
        height: 60px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(29, 33, 35, 0.2);
    }
    .add-set-logo{
        width: 40px;
        height: 40px;
        float: left;
        margin: 14px 11px 8px 11px;
    }
    .add-set-title{
        float: left;
        margin-top: 20px;
    }
    .clear{
        clear:both;
    }
    .course-container{
        background-color: white;
        padding: 20px 20px 50px 20px;
        border: 1px solid #DCDFE6;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .course-info{
        padding: 10px;
        width: 600px;
    }
    .submit{
        width: 140px;
    }
    .add-chapter{
        border: 1px solid #8c939d1a;
        padding: 10px 60px 10px 20px;
        margin:0 0 20px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .child-chapter{
        border: 1px solid #b8860b4d;
        padding: 10px 30px 10px 10px;
        margin-bottom: 20px;
        border-radius: 4px;
    }
    .add-child-chapter{
        float: right;
        text-align: center;
        padding: 9px 15px;
        width: 82px;
        height: 32px;
    }

</style>