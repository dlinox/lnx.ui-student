import { http } from "@/core/http";
import type { ItemSelectable } from "@/core/types/ItemSelectable.types";

export const __getStudentTypesForSelect = async (): Promise<
  ItemSelectable[]
> => {
  try {
    const response = await http().get(`/student-type/items/for-select`);
    let items = response.data.data.map((item: any) => ({
      value: item.value,
      title: item.label,
    }));
    return items as ItemSelectable[];
  } catch (error) {
    return [];
  }
};

// getCurrentPeriod

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

