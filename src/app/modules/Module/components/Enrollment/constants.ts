import { required } from "@/core/utils/rules.utils";
import type { ModuleEnrollmentFormDTO } from "../../types";

export const initialEnrollmentFormState = (): ModuleEnrollmentFormDTO => ({
  moduleId: null,
  curriculumId: null,
  paymentAmount: null,
  paymentMethod: null,
  paymentDate: null,
  paymentSequence: null,
});

export const validationRules = {
  moduleId: [required],
  curriculumId: [required],
  paymentAmount: [required],
  paymentMethod: [required],
  paymentDate: [required],
  paymentSequence: [required],
};
