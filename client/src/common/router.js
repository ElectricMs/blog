
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
<<<<<<< HEAD
    { path: "/classify", component: () => import("../views/Classify_new.vue") },
=======
    { path: "/classify", component: () => import("../views/Classify.vue") },
>>>>>>> 11d742dcc6991bffba1946ccda192b2fb14ad71a
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router, routes };