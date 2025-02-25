<template>
  <v-card
    title="Bienvenido"
    subtitle="Sistema de gestión de asistencia del Instituto de Informática UNA - PUNO"
    class="rounded-0"
    elevation="0"
  />

  <v-card
    v-if="periodStore.current?.enrollmentEnabled == 1"
    color="info"
    variant="tonal"
    title="¡Matriculas abiertas!"
    :subtitle="`Las matrículas para el ciclo académico ${periodStore.current?.name} están abiertas.`"
    elevation="0"
    class="rounded-0"
  >
    <template #prepend>
      <LnxIcon iconName="info-circle" />
    </template>
  </v-card>

  <v-container fluid>
    <v-row>
      <v-col>
        <ModuleList />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { usePeriodStore } from "@/app/store/period.stores";
import ModuleList from "../components/ModuleList.vue";
const periodStore = usePeriodStore();

const initView = async () => {};

onMounted(() => {
  initView();
});
</script>
