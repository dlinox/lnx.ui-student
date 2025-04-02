<template>
  <v-container>
    <v-row class="">
      <v-col cols="12" md="7">
        <ModuleList
          :title="`Mis modulos`"
          :subtitle="`Modulos en los que estas matriculado`"
          :onlyEnrolled="true"
        />
      </v-col>
      <v-col cols="12" md="5">
        <CoursesEnabledList />
      </v-col>
    </v-row>
  </v-container>

  <v-container> </v-container>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import ModuleList from "../components/ModuleList.vue";
import CoursesEnabledList from "../components/CoursesEnabledList.vue";
import { useAuthStore } from "@/app/store/auth.stores";
import { useHeadingStore } from "@/app/store/heading.store";

const headingStore = useHeadingStore();
const authStore = useAuthStore();

const initView = async () => {
  headingStore.setHeading(
    "Mi panel",
    `Bienvenido, ${authStore?.authState?.user.name}`
  );
};

onMounted(() => {
  initView();
});
</script>
