<template>
  <v-card title="Modules" subtitle="Modulos disponibles" class="rounded-0">
    <template v-slot:append>
      <v-btn variant="text" @click="$router.go(-1)">
        <template v-slot:prepend>
          <LnxIcon iconName="arrow-left-3" size="large" />
        </template>
        Atrás
      </v-btn>
    </template>
  </v-card>

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

  <v-container>
    <v-row>
      <v-col cols="12">
        <ModuleList
          :title="`Modulos disponibles`"
          :subtitle="`Modulos en los que puedes matricularte.`"
          :onlyEnrolled="false"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script setup lang="ts">
import { onMounted } from "vue";
import { usePeriodStore } from "@/app/store/period.stores";
import ModuleList from "@/app/modules/Dashboard/components/ModuleList.vue";

const periodStore = usePeriodStore();
const initView = async () => {};
onMounted(() => {
  initView();
});
</script>
