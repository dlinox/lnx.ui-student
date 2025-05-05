import { required } from "@/core/utils/rules.utils";
import type { ModuleEnrollmentFormDTO } from "../../types";

export const initialEnrollmentFormState = (): ModuleEnrollmentFormDTO => ({
  moduleId: null,
  courseId: null,
  groupId: null,
  curriculumId: null,
  paymentAmount: 0,
  paymentMethod: null,
  paymentDate: null,
  paymentSequence: null,
});

export const validationRules = {
  moduleId: [required],
  courseId: [required],
  curriculumId: [required],
  paymentAmount: [required],
  paymentMethod: [required],
  paymentDate: [required],
  paymentSequence: [required],
};
