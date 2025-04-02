import { http } from "@/core/http";

import {
  getSessionToken,
  setSessionToken,
  removeSessionToken,
} from "@/core/utils/session.utils";

import { useAuthStore } from "@/app/store/auth.stores";

import { type AuthRequestDTO } from "../types";

export const _signIn = async (form: AuthRequestDTO): Promise<boolean> => {
  const authStore = useAuthStore();
  try {
    let response = await http().post(`/auth/sign-in`, form);

    setSessionToken(response.data.data.token);
    authStore.setAuthState(response.data.data, true);
    return true;
  } catch (error) {
    return false;
  }
};

export const _signOut = async () => {
  const authStore = useAuthStore();
  try {
    await http().post(`/auth/sign-out`, null);
    removeSessionToken();
    authStore.singOut();
    return true;
  } catch (error) {
    return false;
  }
};

export const _user = async () => {
  const authStore = useAuthStore();
  try {
    let token = getSessionToken();

    if (!token) {
      removeSessionToken();
      authStore.singOut();
      return;
    }
    let response = await http().get(`auth/user`);

    authStore.setAuthState(response.data.data);
    return response.data.data;
  } catch (error: any) {
    return false;
  }
};

export const _clearSession = async () => {
  const authStore = useAuthStore();
  removeSessionToken();
  authStore.clearAuthState();
};

export const _sendCode = async (request: any): Promise<any> => {
  try {
    const response = await http().post(`/auth/send-verification-code`, request);
    return response.data.data;
  } catch (error) {
    return null;
  }
};

export const _reSendCode = async (request: any): Promise<boolean> => {
  try {
    await http().post(`/auth/resend-verification-code`, request);
    return true;
  } catch (error) {
    return false;
  }
};

export const _verifyCode = async (request: any): Promise<boolean> => {
  try {
    await http().post(`/auth/verify-code`, request);
    return true;
  } catch (error) {
    return false;
  }
};

export const _studentType = async (request: any): Promise<boolean> => {
  try {
    await http().post(`/auth/register-student-type`, request);
    return true;
  } catch (error) {
    return false;
  }
};

export const _finishRegister = async (request: any): Promise<boolean> => {
  const authStore = useAuthStore();
  try {
    const response = await http().post(`/auth/register-student`, request);
    setSessionToken(response.data.data.token);
    authStore.setAuthState(response.data.data, true);
    return true;
  } catch (error) {
    return false;
  }
};

export const _saveAccount = async (request: any): Promise<boolean> => {
  const authStore = useAuthStore();
  try {
    const response = await http().post(`/auth/create-account`, request);
    setSessionToken(response.data.data.token);
    authStore.setAuthState(response.data.data, true);
    return true;
  } catch (error) {
    return false;
  }
};

export const _resetPassword = async (request: any): Promise<boolean> => {
  try {
    await http().post(`/auth/reset-password`, request);
    return true;
  } catch (error) {
    return false;
  }
};

export const _createAccount = async (request: any): Promise<boolean> => {
  try {
    await http().post(`/auth/send-create-account`, request);
    return true;
  } catch (error) {
    return false;
  }
};

export const _getDataStudent = async (payload: string): Promise<any> => {
  try {
    const response = await http().get(
      `/auth/get-basic-information-student/${payload}`
    );
    return response.data.data;
  } catch (error) {
    return null;
  }
};

export const _getDataStudentByType = async (payload: string): Promise<any> => {
  try {
    const response = await http().get(`/auth/get-student-by-type/${payload}`);
    return response.data.data;
  } catch (error) {
    return null;
  }
};
