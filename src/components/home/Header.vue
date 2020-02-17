<template>
    <div class="header">
            <div class="header-container">
                <div class="header-logo">
                    <img style="width: 230px" src="../../assets/imgs/logo.png">
                </div>
                <div class="header-link">
                    <ul class="items-ul">
                        <router-link tag="li" to="/courseList" class="item-link">免费课程</router-link>
                        <router-link tag="li" to="/courseList" class="item-link">实战课程</router-link>
                        <router-link tag="li" to="/courseList" class="item-link">课程专栏</router-link>
                        <router-link tag="li" to="/courseList" class="item-link">猿问猿答</router-link>
                    </ul>
                </div>
                <div class="header-search demo-input-suffix">
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search"
                    >
                    </el-input>
                </div>
                <div class="header-signIn">
                    <div class="login-area" v-show="isLogin == false">
                        <el-button type="text" @click="dialogVisible = true"><a>登录</a></el-button>
                        <a>/</a>
                        <el-button type="text" @click="dialogVisible = true"><a>注册</a></el-button>
                    </div>
                    <div class="user-area" v-show="isLogin == true">

                    </div>
                </div>
                <div class="header-cart">
                    <span class="el-icon-shopping-cart-2">购物车</span>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        name: "HomeHeader",
        data(){
            return{
                isLogin:false
            }
        }
    }
</script>

<style scoped>
    .header{
        min-width: 1400px;
        background-color: #ea412b;
        height: 70px;
    }
    .header-container{
        width: 1400px;
        height: 70px;
        line-height: 70px;
        margin: 0 auto;
    }
    .header-logo{
        height: 100%;
        float: left;
    }
    .header-link{
        height: 100%;
        float: left;
        padding:0 30px;
        box-sizing: border-box;
    }
    .header-link .items-ul{
        padding: 0;
        margin: 0;
    }
    .items-ul .item-link{
        cursor: pointer;
        padding: 0 15px;
        float: left;
        list-style-type: none;
    }
    .item-link:hover{
        color: white;
        font-weight: bold;
    }
    .header-search{
        float: left;
        width: 300px;
        padding:0 20px;
    }
    .header-cart{
        float: right;
        width: 70px;
        padding: 0 10px;
        text-align: center;
        margin-left: 30px;
    }
    .header-signIn{
        float: right;
        padding:0 20px;
        cursor: pointer;
    }
    .login-area >>> .el-button--text{
        color: black;
        font-size: 16px;
        padding: 0 10px;
    }
    .login-area >>> .el-button--text:hover{
        color: white;
    }
</style>