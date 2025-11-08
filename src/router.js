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
  // ✅ 使用 Vite 的 BASE_URL 环境变量
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0, behavior: "smooth" }),
});

export default router;
