import { http } from "@/core/http";

const modulePath = "enrollment-deadlines" as const;

export const _getEnrolledPeriod = async (): Promise<any> => {
  try {
    const response = await http().get(
      `/${modulePath}/active-enrollment-period`
    );
    return response.data.data;
  } catch (error) {
    return [];
  }
};
