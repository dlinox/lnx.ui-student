import { required } from "@/core/utils/rules.utils";
import type { CourseFormDTO } from "../../types";

export const initialFormState = (): CourseFormDTO => ({
  isActive: true,
});

export const validationRules = {
  isActive: [required],
};
