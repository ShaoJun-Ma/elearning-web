import Vue from 'vue';
import Vuex from 'vuex';
import qs from 'qs';

Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        isLogin:sessionStorage.getItem("isLogin"),
        userInfo:qs.parse(sessionStorage.getItem("userInfo")),
    },
    //mutations:修改 state的数据
    mutations:{
        changeIsLogin(state,isLogin){
            state.isLogin = isLogin;
        },
        changeUserInfo(state,userInfo){
            state.userInfo = userInfo;
        }
    }

});

export default store;

