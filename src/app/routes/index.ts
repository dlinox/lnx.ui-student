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
import EnrollmentRoutes from "@/app/modules/Enrollment/routes";
import ModuleRoutes from "@/app/modules/Module/routes";

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
      {
        path: "/verificar/:payload",
        name: "Verify",
        component: () => import("@/app/modules/Auth/views/VerifyEmailView.vue"),
      },
      {
        path: "/tipo-estudiante/:payload",
        name: "StudentType",
        component: () => import("@/app/modules/Auth/views/StudentTypeView.vue"),
      },
      {
        path: "/datos-personales/:payload",
        name: "PersonalData",
        component: () => import("@/app/modules/Auth/views/PeronalDataView.vue"),
      },
      {
        path: "/recuperar-contrasena",
        name: "RecoverPassword",
        component: () =>
          import("@/app/modules/Auth/views/RecoverPasswordView.vue"),
      },
      {
        path: "/crear-cuenta",
        name: "CreateAccount",
        component: () =>
          import("@/app/modules/Auth/views/CreateAccountView.vue"),
      },
      {
        path: "/create-account/:payload",
        name: "CreateAccountForm",
        component: () =>
          import("@/app/modules/Auth/views/CreateAccountFormView.vue"),
      },
    ],
  },
  {
    path: "/",
    name: "PanelLayout",
    beforeEnter: authMiddleware,
    component: () => import("@/app/layouts/PanelLayout.vue"),
    children: [
      {
        path: "",
        name: "Dashboard",
        component: () =>
          import("@/app/modules/Dashboard/views/DashboardView.vue"),
      },
      ...CourseRoutes,
      ...EnrollmentRoutes,
      ...ModuleRoutes,
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
