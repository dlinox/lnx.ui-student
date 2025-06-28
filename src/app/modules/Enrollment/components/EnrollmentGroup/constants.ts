import { required } from "@/core/utils/rules.utils";

export const initialEnrollmentFormState = (): any => ({
  curriculumCourseId: null,
  paymentAmount: null,
  paymentMethod: null,
  paymentDate: null,
  paymentSequence: null,
  paymentFile: null,
});

export const validationRules = {
  moduleId: [required],
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
