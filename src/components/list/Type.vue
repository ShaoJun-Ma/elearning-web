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
                    <li class="type-item" :class="{on:-1 == parentType_index}" @click="changeParentTypeIndex(-1)">全部</li>
                    <div v-for="(p_item,index) of courseTypeList" :key="p_item.id">
                        <li class="type-item" :class="{on:index == parentType_index}" @click="changeParentTypeIndex(index)">{{p_item.name}}</li>
                    </div>
                </ul>
            </div>
            <!--分类（子级类型）-->
            <div class="course-type">
                <span class="classify">分类：</span>
                <ul class="type-ul">
                    <li  class="type-item" :class="{on:-1 == childType_index}" @click="changeChildTypeIndex(-1)">全部</li>
                    <div v-for="(c_item,index) of childTypeList" :key="c_item.id">
                        <li class="type-item" :class="{on:index == childType_index}" @click="changeChildTypeIndex(index)">{{c_item.name}}</li>
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
                        <li class="type-item" :class="{on:index==rank_index}" @click="changeRank(index)">{{item}}</li>
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
                parentType_index:-1,
                childType_index:-1,
                rank_index:0
            }
        },
        methods:{
            //方向
            changeParentTypeIndex(index){
                this.parentType_index = index;
                this.childType_index = -1;
                this.rank_index = 0;
                this.getCourse();
            },
            //分类
            changeChildTypeIndex(index){
                this.childType_index = index;
                if(this.childType_index != -1){
                    this.getParentAndChildType();
                }
                this.getCourse();
            },
            //难度
            changeRank(index){
                this.rank_index = index;
                this.getCourse();
            },
            //获取父类型和子类型
            getParentAndChildType(){
                let cid = this.childType_index == -1?0:(this.childTypeList[this.childType_index]).id;
                let data = this.$qs.stringify({
                    cid:cid,
                });
                this.$axios.post("/api/course/getParentAndChildType",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    this.parentType_index = result.result.id - 1;
                    this.$emit("changeChildType",result.result.childCourseType);
                })
            },
            //获取课程列表
            getCourse(){
                let pid = this.parentType_index == -1?0:(this.courseTypeList[this.parentType_index]).id;
                let cid = this.childType_index == -1?0:(this.childTypeList[this.childType_index]).id;
                let data = this.$qs.stringify({
                    pid:pid,
                    cid:cid,
                    rank: this.rankList[this.rank_index],
                    isFree:1,
                });
                this.$axios.post("/api/course/getCourseByPidAndCidAndRank",data).then((result) => {
                    result = result.data;
                    // console.log(result);
                    if(result.status == 200){
                        this.$emit("changeCourse", result.result);
                    }
                })
            },
        },
        computed:{
            //计算子类型
            childTypeList() {
                let childTypeList = [];
                //1、父类型：全部
                if(this.parentType_index == -1){
                    for(let p_item of this.courseTypeList){
                        for(let c_item of p_item.childCourseType){
                            childTypeList.push(c_item);
                        }
                    }
                }else{
                    //2、父类型：具体
                    childTypeList = this.courseTypeList[this.parentType_index].childCourseType;
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