import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    //路由初始指向
    path: "/",
    name: "home",
    component: () => import("@/views/index.vue"),
    meta: {
      title: "首页",
    },
  },
];

const router = createRouter({
  history: createWebHashHistory("/rechildhood/"),
  routes,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0, behavior: "smooth" }), //可以使用 "smooth" 实现平滑滚动效果
});

export default router;
