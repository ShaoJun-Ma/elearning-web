<template>
    <div>
        <list-header></list-header>
        <div class="message">
            <div class="message-container">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="通知" name="message">
                        <div class="notice">
                            <p class="notice-con">ImoocAI小白关注了你</p>
                            <p class="time">2020年02月02日 </p>
                            <span class="el-icon-delete delete"></span>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </div>
        <list-footer></list-footer>
    </div>
</template>

<script>
    import ListHeader from "@/components/list/Header";
    import ListFooter from "@/components/list/Footer";
    export default {
        name: "Message",
        components:{
            ListHeader,
            ListFooter,
        },
        data(){
            return{
                activeName:"message",
            }
        },
        methods:{
            handleClick(tab){
                console.log(tab);
                this.activeName = tab.name;
            }
        }
    }
</script>

<style scoped>
    .message{
        min-width: 1400px;
        background-color: white;
        padding:20px;
    }
    .message-container{
        width: 1100px;
        min-height: 680px;
        margin: 0 auto;
        padding: 20px;
    }
    .notice{
        width: 100%;
        padding: 20px;
        font-size: 15px;
        position: relative;
        box-sizing: border-box;
        border-bottom: 1px solid rgba(29, 33, 35, 0.2);
        border-radius: 4px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .notice p{
        margin: 0;
        padding: 2px 0;
    }
    .notice .time{
        font-size: 14px;
        color: #8c939d;
    }
    .delete{
        cursor: pointer;
        position: absolute;
        right: 20px;
        top: 20px;
    }
    .delete:hover{
        color: red;
    }
    .el-tabs >>> .el-tabs__active-bar{
        background-color: #f56c6c;
    }
    .el-tabs >>> .el-tabs__item.is-active{
        color: #f56c6c;
    }
</style>