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
  paymentFile: null,
});

export const validationRules = {
  moduleId: [required],
  courseId: [required],
  curriculumId: [required],
  paymentAmount: [required],
  paymentMethod: [required],
  paymentDate: [required],
  paymentSequence: [required],
  paymentFile: [
    (v: any) => !!v || "El archivo es obligatorio",
    (v: any) => v.size < 5000000 || "El archivo debe pesar menos de 5MB",
    (v: any) =>
      [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
      ].includes(v.type) || "El archivo debe ser una imagen",
  ],
};
