<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <ModuleList
          :title="`Módulos disponibles`"
          :subtitle="`Módulos en los que puedes matricularte.`"
          :onlyEnrolled="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import ModuleList from "@/app/modules/Dashboard/components/ModuleList.vue";
import { useHeadingStore } from "@/app/store/heading.store";
const headingStore = useHeadingStore();
const initView = async () => {
  headingStore.setHeading("Módulos", "Módulos disponibles");
};
onMounted(() => {
  initView();
});
</script>
