export interface ModuleEnrollmentFormDTO {
  moduleId: number | null;
  courseId: number | null;
  groupId: number | null;
  curriculumId: number | null;
  paymentAmount: number;
  paymentMethod: string | null;
  paymentDate: string | null;
  paymentSequence: number | null;
}
