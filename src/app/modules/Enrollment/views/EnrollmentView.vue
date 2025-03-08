<template>
  <v-card
    title="Mis matriculas"
    subtitle="Lista de matriculas realizadas"
    class="rounded-0"
  >
    <template v-slot:append>
      <v-btn variant="text" @click="$router.go(-1)">
        <template v-slot:prepend>
          <LnxIcon iconName="arrow-left-3" size="large" />
        </template>
        Atrás
      </v-btn>
    </template>
  </v-card>
  <DataTable />
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import DataTable from "@/app/modules/Enrollment/components/DataTable/DataTable.vue";

const initView = async () => {};

onMounted(() => {
  initView();
});
</script>
