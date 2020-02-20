import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SignIn from "@/views/SignIn";
import List from "@/views/List";

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
        path:"/course/list",
        name:"List",
        component:List
    }
];

export default new VueRouter({
    routes,
});

