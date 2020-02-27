<template>
    <div class="type">
        <div class="type-container">
            <div class="type-search">
                <div class="logo">
                    <img class="logo-img" src="../../assets/imgs//player.png">
                    <h3>免费课程</h3>
                </div>
                <div class="demo-input-suffix search">
                    <el-input
                            placeholder="请输入内容"
                            prefix-icon="el-icon-search">
                    </el-input>
                </div>
            </div>
            <!--方向（父级类型）-->
            <div class="course-direction">
                <span class="classify">方向：</span>
                <ul class="type-ul">
                    <li class="type-item" :class="{on:-1 == direction_index}" @click="handleDirectionClick(-1)">全部</li>
                    <div v-for="item of courseTypeList" :key="item.id">
                        <li class="type-item" :class="{on:item.id == direction_index}" @click="handleDirectionClick(item.id)">{{item.name}}</li>
                    </div>
                </ul>
            </div>
            <!--分类（子级类型）-->
            <div class="course-type">
                <span class="classify">分类：</span>
                <ul class="type-ul">
                    <li  class="type-item" :class="{on:-1 == type_index}" @click="handleTypeClick(-1)">全部</li>
                    <div v-for="item of childTypeList" :key="item.id">
                        <li class="type-item" :class="{on:item.id == type_index}" @click="handleTypeClick(item.id)">{{item.name}}</li>
                    </div>
                </ul>
                <!--消除浮动-->
                <div class="clear"></div>
            </div>
            <!--难度-->
            <div class="course-rank">
                <span class="classify">难度：</span>
                <ul class="type-ul">
                    <div v-for="(item,index) of rankList" :key="index">
                        <li class="type-item" :class="{on:index==rank_index}" @click="handleRankClick(index)">{{item}}</li>
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ListType",
        props:{
            courseTypeList:Array
        },
        data(){
            return{
                rankList:["全部","初级","中级","高级"],
                //方向（点击哪一个，就亮灯）
                direction_index:-1,
                //分类
                type_index:-1,
                //难度
                rank_index:0
            }
        },
        methods:{
            //点击方向触发事件
            handleDirectionClick(index){
                this.direction_index = index;
                this.type_index = -1;
                this.rank_index = 0;
                //子组件获取父组件的方法
                this.$parent.getCourse();
            },
            //点击分类
            handleTypeClick(index){
                this.type_index = index;
                if(this.type_index != -1){
                    //改变方向
                    this.updateDirection();
                }
                this.$parent.getCourse();
            },
            //点击难度
            handleRankClick(index){
                this.rank_index = index;
                this.$parent.getCourse();
            },
            //改变方向
            updateDirection(){
                let data = this.$qs.stringify({
                    cid:this.type_index,
                });
                //获取分类对应的方向
                this.$axios.post("/api/course/getParentType",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    this.direction_index = result.result.parentId;
                })
            },
        },
        computed:{
            childTypeList() {
                let childTypeList = [];
                //方向是全部，获取所有分类
                if(this.direction_index == -1){
                    for(let p_item of this.courseTypeList){
                        for(let c_item of p_item.childCourseType){
                            childTypeList.push(c_item);
                        }
                    }
                }else{
                    //方向是具体，获取该方向下的分类
                    // console.log(this.courseTypeList);
                    for(let c of this.courseTypeList){
                        if(c.id == this.direction_index){
                            childTypeList = c.childCourseType;
                        }
                    }
                }
                return childTypeList;
            }
        }
    }
</script>

<style scoped>
    .type{
        min-width: 1400px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .type-container{
        width: 1200px;
        margin: auto;
        padding-bottom: 40px;
    }
    .type-search{
        width: 100%;
        height: 90px;
        border-bottom:1px solid rgba(29, 33, 35, 0.2);
    }
    .logo{
        float: left;
        width: 40%;
        height: 80%;
        margin-top: 12px;
    }
    .logo-img{
        float: left;
        margin-top: 10px;
        margin-right: 10px
    }
    .search{
        float: left;
        width: 40%;
        height: 50%;
        margin-top: 32px;
        margin-left: 236px;
    }
    .course-direction{
        width: 100%;
        height: 65px;
        border-bottom:1px solid rgba(29, 33, 35, 0.2);;
    }
    .classify{
        float: left;
        margin-top: 22px;
        font-weight: bolder;
    }
    .type-ul{
        float: left;
        width: 95%;
        margin: 16px 0;
    }
    .type-item{
        /*border: 1px solid red;*/
        height: 25px;
        line-height: 25px;
        text-align: center;
        padding:5px 10px;
        margin:1px 5px;
        font-size: 14px;
        cursor: pointer;
    }
    .type-item:hover{
        color: red;
    }
    .course-type{
        width: 100%;
        /*height: 194px;*/
        border-bottom:1px solid rgba(29, 33, 35, 0.2);
    }

    .course-rank{
        width: 100%;
        height: 65px;
        border-bottom:1px solid rgba(29, 33, 35, 0.2);;
    }
    .on{
        background-color:#f2130d0f;
        border-radius: 6px;
        font-weight: 700;
        color: red;
    }
    .clear{
        clear: both;
    }

</style>