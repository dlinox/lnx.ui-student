import { http } from "@/core/http";

const modulePath = "period" as const;

export const _getCurrentPeriod = async (): Promise<any> => {
  try {
    const response = await http().get(`/${modulePath}/current`);
    return response.data.data;
  } catch (error) {
    return {};
  }
};

export const _getEnrolledPeriod = async (): Promise<any> => {
  try {
    const response = await http().get(`/${modulePath}/enrollment-period`);
    return response.data.data;
  } catch (error) {
    return [];
  }
};
