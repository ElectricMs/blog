
//路由
import { createRouter, createWebHashHistory } from "vue-router";

let routes = [
    { path: "/test", component: () => import("../views/Test.vue") },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export { router, routes };