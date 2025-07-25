import { http } from "@/core/http";

const modulePath = "courses" as const;

export const _getCurriculumCourses = async (
  moduleId: number | string,
  curriculumId: number | string
): Promise<any[]> => {
  try {
    const response = await http().get(
      `${modulePath}/curriculum/${curriculumId}/module/${moduleId}`
    );
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};

export const _getEnabledCourses = async (limit: number): Promise<any[]> => {
  try {
    const response = await http().get(`${modulePath}/enabled/${limit}`);
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};

export const _getExtracurricularCourses = async (
  curriculumId: number | string
): Promise<any[]> => {
  try {
    const response = await http().get(
      `${modulePath}/extracurricular/${curriculumId}`
    );
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};

export const _getByModuleForSelect = async (
  moduleId: number | string
): Promise<any[]> => {
  try {
    const response = await http().get(
      `${modulePath}/module/${moduleId}/select`
    );
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};

export const _getEnabledGroups = async (): Promise<any[]> => {
  try {
    const response = await http().get(`${modulePath}/enabled-groups`);
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};
