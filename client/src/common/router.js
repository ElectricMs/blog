
//路由
import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
    { path: "/test", component: () => import("../views/Test.vue") },
    { path: "/login", component: () => import("../views/Login.vue") },
    { path: "/dashboard", component: () => import("../views/dashboard/Dashboard.vue"),children:[
        {path: "/dashboard/category", component: () =>import("../views/dashboard/Category.vue")},
        {path: "/dashboard/article", component: () =>import("../views/dashboard/Article.vue")},
    ] },
    { path: "/", component: () => import("../views/Homepage.vue") },
    { path: "/detail", component: () => import("../views/Detail.vue") },
    { path: "/file", component: () => import("../views/File.vue") },
    { path: "/tag", component: () => import("../views/Tag.vue") },
    { path: "/about", component: () => import("../views/About.vue") },
    { path: "/classify", component: () => import("../views/Classify.vue") },
    { path: "/ChartWorldCloud", component: () => import("../views/ChartWordCloud2.vue") },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router, routes };