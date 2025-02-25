import { required } from "@/core/utils/rules.utils";
import type { EnrollmentFormDTO } from "../../types";

export const initialFormState = (): EnrollmentFormDTO => ({
  isActive: true,
});

export const validationRules = {
  isActive: [required],
};
