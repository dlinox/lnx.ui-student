import { http } from "@/core/http";

import type { ModuleEnrollmentFormDTO } from "../../Module/types";

const modulePath = "enrollment" as const;
export const _storeStudentEnrollment = async (
  data: ModuleEnrollmentFormDTO
): Promise<boolean> => {
  try {
    await http().post(`${modulePath}/store-student-enrollment`, data);
    return true;
  } catch (error) {
    return false;
  }
};

// Route::post('enabled-groups-enrollment', [EnrollmentController::class, 'enabledGroupsEnrollment']);

export const _enabledGroupsEnrollment = async (data: any): Promise<any[]> => {
  try {
    const response = await http().post(
      `${modulePath}/enabled-groups-enrollment`,
      data
    );
    return response.data.data as any;
  } catch (error) {
    return [] as any;
  }
};

// Route::post('store-group-enrollment', [EnrollmentController::class, 'storeGroupEnrollment']);

export const _storeGroupEnrollment = async (data: any): Promise<boolean> => {
  try {
    await http().post(`${modulePath}/store-group-enrollment`, data);
    return true;
  } catch (error) {
    return false;
  }
};