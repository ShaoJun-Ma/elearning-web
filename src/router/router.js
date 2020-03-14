import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SignIn from "@/views/SignIn";
import List from "@/views/List";
import Detail from "@/views/Detail";
import Video from "@/views/Video";
import User from "@/views/User";
import Message from "@/views/Message";
import TeacherGroup from "@/views/TeacherGroup";
import AddCourse from "@/views/AddCourse";

Vue.use(VueRouter);

const routes = [
    {
        path:"/",
        name:"Home",
        component:Home,
        meta:{
            headerIndex:0
        }
    },
    {
        path:"/signIn",
        name:"SignIn",
        component:SignIn
    },
    {
        path:"/course/list/:id",
        name:"List",
        component:List,
        meta:{
            headerIndex:1
        }
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
    },
    {
        path:"/course/teacherGroup",
        name:"TeacherGroup",
        component:TeacherGroup,
        meta:{
            headerIndex:2
        }
    },
    {
        path:"/user/message",
        name:"Message",
        component:Message,
        meta:{
            headerIndex:3
        }
    },
    {
        path:"/course/addCourse",
        name:"AddCourse",
        component:AddCourse,
    }


];

export default new VueRouter({
    routes,
});

