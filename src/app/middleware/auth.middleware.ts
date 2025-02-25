import { user, } from "@/app/modules/Auth/services";

import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

export const authMiddleware = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const auth = await user();
  if (!auth) {
    console.log("Redirecting to login page...");
    // await clearSession();
    next({ name: "Login" });
  } else {
    next();
  }
};

// no auth
export const noAuthMiddleware = async (
  _to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const auth = await user();
  if (auth) {
    console.log("Redirecting to dashboard...");
    next(auth.user.redirectTo);
  } else {
    next();
  }
};
