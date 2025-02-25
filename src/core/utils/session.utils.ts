import Cookies from "js-cookie";

export const getSessionToken = () => {
  const sessionToken = Cookies.get("STUDENT.INFOUNA-SESSION")
    ? Cookies.get("STUDENT.INFOUNA-SESSION")
    : "";
  return sessionToken;
};

export const setSessionToken = (token: string) => {
  Cookies.set("STUDENT.INFOUNA-SESSION", token, {
    expires: 1,
  });
};

export const removeSessionToken = () => {
  Cookies.remove("STUDENT.INFOUNA-SESSION");
};
