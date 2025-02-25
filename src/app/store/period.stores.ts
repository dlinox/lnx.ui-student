import { _getCurrentPeriod } from "@/app/modules/Period/services";

import { defineStore } from "pinia";
import { ref } from "vue";
export const usePeriodStore = defineStore("period", () => {
  const current = ref<any | null>(null);
  const getCurrent = async () => {
    current.value = await _getCurrentPeriod();
  };
  return {
    current,
    getCurrent,
  };
});
