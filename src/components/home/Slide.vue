<template>
    <div class="slide">
        <!-- 侧边栏 -->
        <div class="slide-left">
            <el-menu class="el-menu-demo slide-menu"
                     mode="vertical" :collapse="true">
                <el-submenu :index="p_item.id+''" v-for="(p_item) of courseTypeList" :key="p_item.id">
                    <template slot="title">
                        <router-link tag="div" to="/" class="parent-type-item">
                            {{p_item.name}}<i class="el-icon-caret-right"></i>
                        </router-link>
                    </template>
                    <div class="menu-show">
                        <span class="parent-type-name">{{p_item.name}}</span>
                        <br>
                        <router-link tag="span" to="/" class="child-type-item" v-for="(c_item) of p_item.childCourseType" :key="c_item.id">
                            {{c_item.name}}
                            <el-divider direction="vertical"></el-divider>
                        </router-link>
                    </div>
                </el-submenu>
            </el-menu>
        </div>
        <!-- 轮播图 -->
        <div class="slide-right">
            <el-carousel :interval="5000" height="389px" arrow="always">
                <el-carousel-item v-for="(item,index) of imgList" :key="index">
                    <img class="carousel-img" :src="item">
                </el-carousel-item>
            </el-carousel>
        </div>
    </div>
</template>

<script>
    export default {
        name: "HomeSlide",
        props:{
            courseTypeList:Array
        },
        data(){
            return{
                imgList:[
                    require("../../assets/imgs/slide1.jpg"),
                    require("../../assets/imgs/slide2.jpg"),
                    require("../../assets/imgs/slide3.jpg"),
                    require("../../assets/imgs/slide4.jpg"),
                ],
                parentCourseTypeList:["前端","b","c","a","b","c","a"],

            }
        }

    }
</script>

<style scoped>
    .slide{
        width: 100%;
        height:389px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        border-radius: 15px;
        margin-top: 20px;
    }
    .slide-left{
        width: 20%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    .slide-left .el-menu{
        background-color:#283746 !important;
    }
    .slide-menu{
        width: 100%;
    }
    .parent-type-item{
        text-align: center;
        font-size: 16px;
        color: white;
        opacity: 0.9;
        border-bottom: 1px solid white;
    }
    .parent-type-item:hover{
        color: white;
        border-bottom: 1px solid white;
    }
    el-menu--vertical >>> .el-menu--popup{
        height: 371px;
    }
    .el-menu--collapse{
        border-top-left-radius:15px;
        border-bottom-left-radius:15px;
    }
    .el-menu--collapse .el-submenu{
        width: 100%;
        height: 55.6px;
    }
    .parent-type-item:hover{
        background-color:rgba(255,255,255,0.2);
    }

    .el-submenu >>> .el-submenu__title:hover{
        background-color: rgba(255,255,255,0.2) !important;
    }
    .menu-show{
        width:520px;
        height: 371px;
        padding: 5px 20px;
        line-height: 30px;
    }
    .parent-type-name{
        line-height: 35px;
        font-weight: bolder;
        font-size: 17px;
    }
    .child-type-item{
        cursor: pointer;
        padding: 0 5px;
    }
    .child-type-item:hover{
        color: red;
    }
    .slide-right{
        width: 80%;
        height: 100%;
        float: left;
        box-sizing: border-box;
    }
    .carousel-img{
        width: 100%;
        border-top-right-radius:15px;
        border-bottom-right-radius:15px;
    }

</style>

<style>
    .el-menu--vertical{
        top: 90px !important;
    }
    .el-menu--popup-right-start{
        margin-left: 0 !important;
        padding-top: 18px;
    }
</style>