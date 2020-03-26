<template>
    <div>
        <list-header></list-header>
        <div class="addCourse">
            <div class="addCourse-container">
                <div class="add-set">
                    <img class="add-set-logo" src="../assets/imgs/addCourse-set.png">
                    <h3 class="add-set-title">创建课程</h3>
                    <div class="clear"></div>
                </div>
                <div class="course-container">
                    <div class="course-info">
                        <el-form ref="form" :model="form" label-width="80px">
                            <el-form-item label="课程名称:">
                                <el-input v-model="form.name" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="课程难度:">
                                <el-radio-group v-model="form.rank">
                                    <el-radio label="初级"></el-radio>
                                    <el-radio label="中级"></el-radio>
                                    <el-radio label="高级"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="课程类型:">
                                <el-cascader :options="options" clearable></el-cascader>
                            </el-form-item>
                            <el-form-item label="是否免费:">
                                <el-radio-group v-model="form.isFree">
                                    <el-radio label="免费"></el-radio>
                                    <el-radio label="付费"></el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label="课程价格:">
                                <el-input v-model="form.price" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="封面图:">
                                <el-upload
                                        class="upload-demo"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        multiple
                                        :limit="1">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                                </el-upload>
                            </el-form-item>
                            <el-form-item label="课程描述:">
                                <el-input
                                        type="textarea"
                                        :rows="3"
                                        maxlength="200"
                                        placeholder="请输入课程描述"
                                        v-model="textarea"
                                        show-word-limit>
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button class="submit" type="primary" @click="submitForm('form')">创建课程</el-button>
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
           }
        },
        mounted(){
            this.getOptions();
        }
    }
</script>

<style scoped>
    .addCourse{
        min-width: 1400px;
        padding-top: 10px;
        background-color: #E9EEF3;
        color: #333;
    }
    .addCourse-container{
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
        width: 44px;
        height: 35px;
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
</style>