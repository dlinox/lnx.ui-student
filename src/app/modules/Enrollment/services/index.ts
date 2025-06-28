import { http } from "@/core/http";

import type { ModuleEnrollmentFormDTO } from "../../Module/types";
import type {
  DataTableRequestDTO,
  DataTableResponseDTO,
} from "@/core/types/DataTable.types";
const modulePath = "enrollment" as const;

export const _loadDataTable = async (
  request: DataTableRequestDTO
): Promise<DataTableResponseDTO<any>> => {
  try {
    const response = await http().post(`${modulePath}/load-data`, request);
    return response.data.data as DataTableResponseDTO<any>;
  } catch (error) {
    return {} as DataTableResponseDTO<any>;
  }
};

export const _storeStudentEnrollment = async (
  data: ModuleEnrollmentFormDTO
): Promise<boolean> => {
  try {
    const auxForm: any = { ...data };
    if (auxForm.paymentFile) {
      auxForm.paymentFile = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(auxForm.paymentFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    }
    await http().post(`${modulePath}/store-student-enrollment`, auxForm);
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

export const _storeGroupEnrollment = async (data: any): Promise<boolean> => {
  try {
    const auxForm: any = { ...data };
    if (auxForm.paymentFile) {
      auxForm.paymentFile = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(auxForm.paymentFile);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    }
    await http().post(`${modulePath}/store-group-enrollment`, auxForm);
    return true;
  } catch (error) {
    return false;
  }
};
// update-group-enrollment
export const _updateGroupEnrollment = async (data: any): Promise<boolean> => {
  try {
    await http().post(`${modulePath}/update-group-enrollment`, data);
    return true;
  } catch (error) {
    return false;
  }
};

//reserver-group-enrollment
export const _reserverGroupEnrollment = async (data: any): Promise<boolean> => {
  try {
    await http().post(`${modulePath}/reserver-group-enrollment`, data);
    return true;
  } catch (error) {
    return false;
  }
};
//cancel-group-enrollment
export const _cancelGroupEnrollment = async (data: any): Promise<boolean> => {
  try {
    await http().post(`${modulePath}/cancel-group-enrollment`, data);
    return true;
  } catch (error) {
    return false;
  }
};
