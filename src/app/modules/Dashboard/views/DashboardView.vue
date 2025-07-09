<template>
  <v-container>
    <v-row class="">
      <v-col cols="12" md="7">
        <ModuleList
          :title="`Mis módulos`"
          :subtitle="`Módulos en los que estás matriculado`"
          :onlyEnrolled="true"
        />
      </v-col>
      <v-col cols="12" md="5">
        <v-row>
          <v-col cols="12" v-if="periodStore.enrolled?.period">
            <GroupList :period="periodStore.enrolled.period" />
          </v-col>
          <v-col cols="12">
            <v-card
              title="Horario"
              subtitle="Mis Horarios Semanales"
              elevation="0"
            >
              <v-card-item v-for="(schedule, index) in schedules" :key="index">
                <h6 class="text-h6">
                  {{ schedule.dayName }}
                </h6>
                <ul>
                  <li v-for="(hour, index) in schedule.hours" :key="index">
                    <h6
                      class="text-subtitle-1 d-flex align-center text-primary"
                    >
                      <LnxIcon iconName="clock-1" class="me-2" />
                      {{ hour }}
                    </h6>
                  </li>
                </ul>
              </v-card-item>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-container> </v-container>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import ModuleList from "../components/ModuleList.vue";
import { useAuthStore } from "@/app/store/auth.stores";
import { useHeadingStore } from "@/app/store/heading.store";
import { _getAvailableSchedules } from "@/app/modules/Schedule/schedule.services";
import LnxIcon from "@/core/ui/components/icons/LnxIcon.vue";
import GroupList from "../../Course/components/GroupList.vue";
import { usePeriodStore } from "@/app/store/period.stores";

const periodStore = usePeriodStore();
const headingStore = useHeadingStore();
const authStore = useAuthStore();

const schedules = ref<any[]>([]);

const initView = async () => {
  periodStore.getEnrolled();
  schedules.value = await _getAvailableSchedules();
  headingStore.setHeading(
    "Inicio",
    `Bienvenido(a), ${authStore?.authState?.user.name}`
  );
};

onMounted(() => {
  initView();
});
</script>
