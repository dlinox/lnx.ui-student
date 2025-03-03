import { http } from "@/core/http";

const modulePath = "modules" as const;

export const _getModulesByCurriculum = async (id: number): Promise<any[]> => {
  try {
    const response = await http().get(`${modulePath}/curriculum/${id}`);
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};

export const _getModuleByCurriculum = async (
  id: number | string,
  curriculumId: number | string
): Promise<any> => {
  try {
    const response = await http().get(
      `${modulePath}/${id}/curriculum/${curriculumId}`
    );
    return response.data.data as any;
  } catch (error) {
    return {} as any;
  }
};
