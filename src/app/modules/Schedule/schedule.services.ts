import { http } from "@/core/http";

const modulePath = "schedules" as const;

export const _getAvailableSchedules = async (): Promise<any[]> => {
  try {
    const response = await http().get(`${modulePath}/available`);
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};
