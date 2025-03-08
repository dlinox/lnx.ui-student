import { type RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "modulos",
    name: "Modules",
    component: () => import("@/app/modules/Module/views/ModuleView.vue"),
  },
];

export default routes;
