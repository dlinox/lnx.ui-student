import { required } from "@/core/utils/rules.utils";

export const initialEnrollmentFormState = (): any => ({
  curriculumCourseId: null,
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
