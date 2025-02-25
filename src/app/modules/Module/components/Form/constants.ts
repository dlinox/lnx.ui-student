import { required } from "@/core/utils/rules.utils";
import type { ModuleFormDTO } from "../../types";

export const initialFormState = (): ModuleFormDTO => ({
  isActive: true,
});

export const validationRules = {
  isActive: [required],
};
