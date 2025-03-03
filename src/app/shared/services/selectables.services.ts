import { http } from "@/core/http";
import type { ItemSelectable } from "@/core/types/ItemSelectable.types";

export const __getStudentTypesForSelect = async (): Promise<
  ItemSelectable[]
> => {
  try {
    const response = await http().get(`/student-types/items/for-select`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};

export const __getCurrentPeriod = async (): Promise<ItemSelectable> => {
  try {
    const response = await http().get(`/period/current`);
    return {
      value: response.data.data.value,
      title: response.data.data.label,
    };
  } catch (error) {
    return {
      value: "",
      title: "",
    };
  }
};
