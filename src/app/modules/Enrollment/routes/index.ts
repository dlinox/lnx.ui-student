import { type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "enrollment",
    name: "Enrollment",
    component: () => import("@/app/modules/Enrollment/views/EnrollmentView.vue"),
  },
];

export default routes;
