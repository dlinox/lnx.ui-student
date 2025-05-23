import { http } from "@/core/http";

const modulePath = "modules" as const;

export const _getModulesByCurriculum = async (data: any): Promise<any[]> => {
  try {
    const response = await http().post(`${modulePath}/curriculum`, data);
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

export const _getModulesEnabledOnPeriod = async (): Promise<any[]> => {
  try {
    const response = await http().get(
      `${modulePath}/enabled-on-period`
    );
    return response.data.data as any[];
  } catch (error) {
    return [] as any[];
  }
};

//Route::get('module/{moduleId}/select', [CourseController::class, 'getByModuleForSelect']);
