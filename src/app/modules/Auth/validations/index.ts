import { email, required } from "@/core/utils/rules.utils";

export const AuthFormValidation = {
  username: [required],
  password: [required],
};

export const RegisterFormValidation = {
  email: [required, email],
};
