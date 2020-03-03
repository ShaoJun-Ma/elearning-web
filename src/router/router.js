import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SignIn from "@/views/SignIn";
import List from "@/views/List";
import Detail from "@/views/Detail";
import Video from "@/views/Video";
import User from "@/views/User";

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        name:"Home",
        component:Home
    },
    {
        path:"/signIn",
        name:"SignIn",
        component:SignIn
    },
    {
        path:"/course/list/:id",
        name:"List",
        component:List
    },
    {
        path:"/course/detail/:id",
        name:"Detail",
        component:Detail
    },
    {
        path:"/course/video/:id",
        name:"Video",
        component:Video
    },
    {
        path:"/user/userInfo",
        name:"User",
        component:User
    }

];

export default new VueRouter({
    routes,
});

