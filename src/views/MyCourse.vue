<template>
    <div>
        <list-header></list-header>
        <div class="myCourse">
            <div class="myCourse-container">
                <div class="my-course-set">
                    <img class="my-course-set-logo" src="../assets/imgs/myCourse-set.png">
                    <h3 class="my-course-set-title">我的课程</h3>
                    <div class="clear"></div>
                </div>
                <div class="myCourse-con">
                    <el-tabs type="border-card">
                        <!--已学课程-->
                        <el-tab-pane>
                            <span slot="label"><i class="el-icon-tickets"></i>已学课程</span>
                            <Learned></Learned>
                        </el-tab-pane>
                        <el-tab-pane>
                            <span slot="label">
                                    <i class="el-icon-upload"></i>
                                    已创建课程
                                </span>
                            <Created></Created>
                        </el-tab-pane>
                    </el-tabs>
                </div>
            </div>
        </div>
        <list-footer></list-footer>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListFooter from "@/components/list/Footer";
    import Learned from "@/components/myCourse/Learned";
    import Created from "@/components/myCourse/Created";
    export default {
        name: "MyCourse",
        components: {Created, Learned, ListFooter, ListHeader}
    }
</script>

<style scoped>
    .myCourse{
        min-width: 1400px;
        padding-top: 10px;
        background-color: #E9EEF3;
        color: #333;
    }
    .myCourse-container{
        width: 1100px;
        margin: 0 auto;
        padding-bottom: 100px;
    }
    .my-course-set{
        height: 60px;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(29, 33, 35, 0.2);
    }
    .my-course-set-logo{
        float: left;
        margin: 14px;
    }
    .my-course-set-title{
        float: left;
        margin-top: 20px;
    }
    .clear{
        clear:both;
    }

</style>