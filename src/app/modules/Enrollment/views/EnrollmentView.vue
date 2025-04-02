<template>
  <v-container>
    <DataTable />
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import DataTable from "@/app/modules/Enrollment/components/DataTable/DataTable.vue";
import { useHeadingStore } from "@/app/store/heading.store";
const headingStore = useHeadingStore();
const initView = async () => {
  headingStore.setHeading("Mis matriculas", "Lista de matriculas realizadas");
};

onMounted(() => {
  initView();
});
</script>
