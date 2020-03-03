<template>
    <div class="info">
        <div class="update-user-info">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="用户名">
                    <el-input v-model="form.username">
                    </el-input>
                </el-form-item>
                <el-form-item label="昵称">
                    <el-input v-model="form.nickname">
                    </el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-select v-model="form.sex">
                        <el-option label="保密" value="保密">
                        </el-option>
                        <el-option label="男" value="男">
                        </el-option>
                        <el-option label="女" value="女">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="城市">
                    <el-cascader size="large" :options="cityOptions" v-model="cityInfo"
                                 placeholder="未设置" @change="changeCityInfo">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="职业">
                    <el-input v-model="form.job">
                    </el-input>
                </el-form-item>
                <el-form-item label="个性签名">
                    <el-input
                            type="text"
                            v-model="form.signature"
                            maxlength="120"
                            show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="changeUserInfo()">保存</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {regionData,TextToCode,CodeToText} from 'element-china-area-data';
    export default {
        name: "UserInfo",
        data(){
            return{
                cityOptions: regionData,
                //用户信息表单
                form: {
                    id:this.$store.state.userInfo.id,
                    username:this.$store.state.userInfo.username,
                    nickname:this.$store.state.userInfo.nickname,
                    sex:this.$store.state.userInfo.sex,
                    city:this.$store.state.userInfo.city,
                    job:this.$store.state.userInfo.job,
                    signature:this.$store.state.userInfo.signature,
                },
            }
        },
        computed:{
            userInfo(){
                return this.$store.state.userInfo;
            },
            //将city字符串转数组
            cityInfo(){
              let selectedOptions = [];
              let city = this.$store.state.userInfo.city;
              if(city != '未设置'){
                  let address = city.split("/");
                  // console.log(TextToCode);
                  // 省份
                  let provinceCode = TextToCode[address[0]].code;
                  selectedOptions.push(provinceCode);
                  // 城市
                  let cityCode = TextToCode[address[0]][address[1]].code;
                  selectedOptions.push(cityCode);
                  // 地区
                  let areaCode = TextToCode[address[0]][address[1]][address[2]].code;
                  selectedOptions.push(areaCode);
              }
              return selectedOptions;
            }
        },

        methods:{
            //修改个人信息
            changeUserInfo(){
                let data = this.$qs.stringify(this.form);
                this.$axios.post("/api/user/changeUserInfo",data).then((result) => {
                    result = result.data;
                    console.log(result);
                    if(result.status == 200){
                        this.$message({
                            message:result.message,
                            type:"success",
                        });
                        //更新 vuex 中 state 的数据
                        this.$store.commit("changeUserInfo",result.result);
                        //更新缓存
                        sessionStorage.setItem("userInfo",this.$qs.stringify(result.result));
                    }else{
                        this.$message({
                            message:result.message,
                            type:"error",
                        })
                    }
                })
            },
            //将city数组转为字符串进行保存
            changeCityInfo(value){
                console.log(value);
                this.form.city = CodeToText[value[0]]+"/"+CodeToText[value[1]]+"/"+CodeToText[value[2]];
            }
        }
    }
</script>

<style scoped>
    .update-user-info{
        width: 400px;
    }
    .avatar-uploader .el-upload {
        /*border: 1px solid black;*/
        border-radius: 50%;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
</style>