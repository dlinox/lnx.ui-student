import {
  _getCurrentPeriod,
  _getEnrolledPeriod,
} from "@/app/modules/Period/services";

import { defineStore } from "pinia";
import { ref } from "vue";
export const usePeriodStore = defineStore("period", () => {
  const current = ref<any | null>(null);
  const enrolled = ref<any | null>(null);
  const getCurrent = async () => {
    current.value = await _getCurrentPeriod();
  };
  const getEnrolled = async () => {
    enrolled.value = await _getEnrolledPeriod();
  };
  return {
    current,
    getCurrent,
    enrolled,
    getEnrolled,
  };
});
