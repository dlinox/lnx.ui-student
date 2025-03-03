<template>
  <v-card
    title="Bienvenido"
    subtitle="Instituto de Informática UNA - PUNO"
    class="rounded-0"
    elevation="0"
  />

  <v-card
    v-if="periodStore.enrolled"
    color="info"
    variant="tonal"
    title="¡Matriculas abiertas!"
    :subtitle="`Las matrículas para el ciclo académico ${periodStore.enrolled?.name} están habilitadas.`"
    elevation="0"
    class="rounded-0"
  >
    <template #prepend>
      <LnxIcon iconName="info-circle" />
    </template>
  </v-card>

  <v-container >
    <v-row>
      <v-col cols="12" md="7">
        <ModuleList />
      </v-col>
      <v-col cols="12" md="5">
        <CoursesExtracurricularList />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { usePeriodStore } from "@/app/store/period.stores";
import ModuleList from "../components/ModuleList.vue";
import CoursesExtracurricularList from "../components/CoursesExtracurricularList.vue";
const periodStore = usePeriodStore();

const initView = async () => {};

onMounted(() => {
  initView();
});
</script>
