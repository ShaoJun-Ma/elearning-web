import Vue from 'vue';
import VueRouter from "vue-router";
import Home from "@/views/Home";
import SignIn from "@/views/SignIn";

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
];

export default new VueRouter({
    routes,
});

