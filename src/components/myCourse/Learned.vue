<template>
    <div class="my-course">
        <div class="block">
            <el-timeline>
                <el-timeline-item timestamp="2018/4/18" placement="top">
                    <el-card>
                        <div class="course-card">
                            <div class="course-card-lef">
                                <img src="../../assets/imgs/m1.jpg"/>
                            </div>
                            <div class="course-card-right">
                                <h3>初始Python</h3>
                                <p>
                                    <span class="course-card-free">免费课程</span>
                                    <span>学习至1.01 Python入门课程介绍</span>
                                </p>
                                <p>
                                    <span style="color: red">已学20%</span>
                                    <span>用时2小时</span>
                                </p>
                                <div class="continue-button">
                                    <el-button type="danger" round>继续学习</el-button>
                                </div>
                            </div>
                            <div class="clear"></div>
                        </div>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item timestamp="2018/4/12" placement="top">
                    <el-card>
                        <div class="course-card">
                            <div class="course-card-lef">
                                <img src="../../assets/imgs/m1.jpg"/>
                            </div>
                            <div class="course-card-right">
                                <h3>初始Python</h3>
                                <p>
                                    <span class="course-card-free">免费课程</span>
                                    <span>学习至1.01 Python入门课程介绍</span>
                                </p>
                                <p>
                                    <span style="color: red">已学20%</span>
                                    <span>用时2小时</span>
                                </p>
                                <div class="continue-button">
                                    <el-button type="danger" round>继续学习</el-button>
                                </div>
                            </div>
                        </div>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Learned"
    }
</script>

<style scoped>
    .course-card{
        height: 114px;
        /*border: 1px solid goldenrod;*/
    }

    .course-card-lef{
        width: 200px;
        height: 100%;
        /*border: 1px solid red;*/
        float: left;
    }
    .course-card-lef img{
        width: 200px;
        height: 110px;
    }
    .course-card-right{
        float: left;
        width: 500px;
        height: 100%;
        margin-left: 20px;
        position: relative;
    }
    .course-card-right p{
        margin:7px 0;
    }
    .course-card-right p span{
        margin-right: 14px;
    }
    .course-card-free{
        background-color:#f5f7fa;
        border-radius: 2px;
        width: 62px;
        height: 20px;
        text-align: center;
        font-size: 12px;
        color: #9199A1;
        margin-right: 12px;
        line-height: 20px;
    }
    .course-card-right .el-button{
        padding: 8px 11px !important;
        float: right;
    }
    .continue-button{
        position: absolute;
        bottom: 0;
        right: 0;
    }
</style>