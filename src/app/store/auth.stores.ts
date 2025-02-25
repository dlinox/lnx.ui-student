import { defineStore } from "pinia";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";

import { type AuthDTO } from "@/app/modules/Auth/types";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();
  const authState: Ref<AuthDTO> = ref({
    token: "",
    user: {
      name: "",
      redirectTo: "/",
      role: "",
      email: "",
    },
    permissions: "",
  });

  const signInSuccess = (response: any) => {
    localStorage.setItem("token", response.data);
    router.push("/");
  };

  const singOut = () => {
    clearAuthState();
    // window.location.href = "/";
    // router.replace("/");
  };

  const setAuthState = (auth: AuthDTO, isSignIn: boolean = false) => {
    authState.value = auth;
    if (isSignIn) router.push(auth.user.redirectTo);
  };

  const clearAuthState = () => {
    authState.value = {
      token: "",
      user: {
        name: "",
        redirectTo: "/",
        role: "",
        email: "",
      },
      permissions: "",
    };
  };

  return {
    authState,
    setAuthState,
    clearAuthState,
    signInSuccess,
    singOut,
  };
});
