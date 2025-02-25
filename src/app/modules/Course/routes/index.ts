import { type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "curso/:id/module",
    name: "Course",
    component: () => import("@/app/modules/Course/views/CourseView.vue"),
  },
];

export default routes;
