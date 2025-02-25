import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import vuetify from "@/core/ui/plugins/vuetify";
import permission from "@/core/directives/permissions";
import upperCase from "@/core/directives/textTransform";

import { VueQrcodeReader } from "vue-qrcode-reader";

import LnxIcon from "@/core/ui/components/icons/LnxIcon.vue";
import LnxDataTable from "@/core/ui/components/DataTable/LnxDataTable.vue";
import LnxDialogConfirm from "@/core/ui/components/Dialog/DialogConfirm.vue";
import LnxStatusChip from "@/core/ui/components/Chip/StatusChip.vue";
import "vue-toast-notification/dist/theme-sugar.css";
import "./style.css";

import router from "@/app/routes";

const pinia = createPinia();
const app = createApp(App);
app.directive("permission", permission);
app.directive("upper-case", upperCase);
app.use(pinia);
app.use(router);
app.use(vuetify);
app.use(VueQrcodeReader);
app.component("LnxIcon", LnxIcon);
app.component("LnxDataTable", LnxDataTable);
app.component("LnxDialogConfirm", LnxDialogConfirm);
app.component("LnxStatusChip", LnxStatusChip);
app.mount("#app");
