import { required } from "@/core/utils/rules.utils";

export interface AuthRequestDTO {
  username: string;
  password: string;
}

export interface AuthUserDTO {
  name: string;
  redirectTo: string;
  role: string;
  email: string;
}

export interface AuthDTO {
  token: string;
  user: AuthUserDTO;
  permissions: string;
}

export const AuthFormRules = {
  username: [required],
  password: [required],
};
