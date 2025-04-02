import Cookies from "js-cookie";
import { v4 as uuidv4 } from 'uuid';

//definir un cookie de sesión para identificar al usuario o navegador
export const setIdentificationCookie = () => {
  Cookies.set("STUDENT.INFOUNA-IDENTIFICATION", uuidv4(), {
    expires: 1,
    sameSite: "Lax", // Permite el envío en la mayoría de los casos
  });
};

//obtener el cookie de identificación
export const getIdentificationCookie = () => {
  const identification = Cookies.get("STUDENT.INFOUNA-IDENTIFICATION")
    ? Cookies.get("STUDENT.INFOUNA-IDENTIFICATION")
    : "";
  return identification;
};

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
