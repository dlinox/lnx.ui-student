import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";

import {
  authMiddleware,
  noAuthMiddleware,
} from "@/app/middleware/auth.middleware";

import CourseRoutes from "@/app/modules/Course/routes";

const routes: RouteRecordRaw[] = [
  {
    path: "/auth",
    name: "AuthLayout",
    component: () => import("@/app/layouts/AuthLayout.vue"),
    beforeEnter: noAuthMiddleware,
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("@/app/modules/Auth/views/LoginView.vue"),
      },
      {
        path: "/registro",
        name: "Register",
        component: () => import("@/app/modules/Auth/views/RegisterView.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "AdminLayout",
    beforeEnter: authMiddleware,
    component: () => import("@/app/layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () =>
          import("@/app/modules/Dashboard/views/DashboardView.vue"),
      },
      ...CourseRoutes,
    ],
  },
  {
    path: "/docs",
    name: "Documentation",
    children: [
      {
        path: "icons",
        name: "Icons",
        component: () => import("@/docs/views/LnxIconView.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
