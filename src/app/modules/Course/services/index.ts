import { http } from "@/core/http";

const modulePath = "courses" as const;

// Route::get('curriculum/{curriculumId}/module/{moduleId}', [CourseController::class, 'getCurriculumCourses']);
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

// Route::get('extracurricular/{curriculumId}', [CourseController::class, 'getExtracurricularCourses']);

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