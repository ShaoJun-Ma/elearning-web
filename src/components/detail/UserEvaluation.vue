<template>
    <div class="evaluation">
        <div class="evaluation-container section-box" v-if="isLogin == 'true'">
            <a class="img-box">
                <img :src="userInfo.faceImg">
            </a>
            <div class="evaluation-input">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item prop="textarea">
                        <el-input
                                type="textarea"
                                :rows="4"
                                placeholder="写下你对课程的评价..."
                                v-model="ruleForm.textarea">
                        </el-input>
                    </el-form-item>
                    <span class="num-tip">0/300</span>
                    <el-form-item>
                        <el-button  type="primary" round @click="addEvaluation('ruleForm')">提交</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="evaluation-container section-box" v-for="(item,index) in evaluationList.list" :key="index">
            <div class="img-box">
                <img :src="item.faceImg"/>
            </div>

            <div class="content-box">
                <p class="name">{{item.username}}</p>
                <p>{{item.evaluation}}</p>
                <p class="time">{{item.timeDiff}}</p>
            </div>
        </div>

        <!--分页-->
        <div class="course-page">
            <el-pagination
                    background
                    @current-change="pageChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "UserEvaluation",
        props:{
            evaluationList:Object,
        },
        data(){
          return{
              ruleForm:{
                  textarea:"",
              },
              rules:{
                  textarea:[
                      { min: 10, max: 300, message: '字数不得少于10个字', trigger: 'blur' }
                  ]
              },
              currentPage:1,
              pageSize:2,
              total:0,
          }
        },
        computed:{
            isLogin(){
                return this.$store.state.isLogin;
            },
            userInfo(){
                return this.$store.state.userInfo;
            }
        },
        methods:{
            pageChange(data){
                this.$emit("handleCurrentPageClick",data);
            }
        }
    }
</script>

<style scoped>
    .evaluation{
        width: 800px;
        margin-top: 10px;
        float: left;
    }
    .section-box{
        line-height: 28px;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        padding: 15px;
        margin-bottom: 10px;
    }
    .img-box{
        width: 40px;
        height: 40px;
        line-height: 20px;
        border-radius: 50%;
        float: left;
    }
    .img-box img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
    .content-box{
        padding:0 0 23px 54px;
    }
    .content-box .name{
        margin: 0;
        font-size: 14px;
        color: #787d82;
        font-weight:700;
    }
    .content-box .time{
        float:right;
        font-size: 13px;
        color:#b5b9bc;
        line-height: 35px;
    }
    .evaluation-input{
        padding-left: 54px;
        padding-top: 10px;
        text-align: right;
        position: relative;
    }
    .evaluation-input .num-tip{
        position: absolute;
        right: 16px;
        bottom: 64px;
        font-size: 12px;
        color: #b5b9bc;
        line-height: 20px;
    }

    /*分页*/
    .course-page{
        height: 47px;
        text-align: center;
        margin: 25px 0 auto;
    }
</style>