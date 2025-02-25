export const required = (value: any) => !!value || "Obligatorio";

export const email = (value: string) => {
  //permite que si el corre es vacio no lo valide
  if (value === "") return true;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value) || "Correo electrónico no válido";
};

export const dni = (value: string) => {
  if (value === "" || value === null) return true;
  const dniPattern = /^[0-9]{8}$/; // 8 dígitos numéricos
  return dniPattern.test(value) || "DNI no válido";
};

export const carnetExtranjeria = (value: string) => {
  if (value === "" || value === null) return true;

  const carnetExtranjeriaPattern = /^[0-9]{12}$/; // 12 dígitos numéricos
  return (
    carnetExtranjeriaPattern.test(value) || "Carnet de extranjería no válido"
  );
};

export const ruc = (value: string) => {
  if (value === "" || value === null) return true;

  const rucPattern = /^[0-9]{11}$/; // 11 dígitos numéricos
  return rucPattern.test(value) || "RUC no válido";
};

export const passport = (value: string) => {
  if (value === "" || value === null) return true;

  const passportPattern = /^[a-zA-Z0-9]{3,20}$/; // 3 a 20 caracteres alfanuméricos
  return passportPattern.test(value) || "Pasaporte no válido";
};

export const birthCertificate = (value: string) => {
  if (value === "" || value === null) return true;

  const birthCertificatePattern = /^[0-9]{8}$/; // 8 dígitos numéricos
  return (
    birthCertificatePattern.test(value) ||
    "Partida de nacimiento-identidad no válida"
  );
};

export const document = (type: string | undefined) => {
  if (type === undefined) return true;
  return (value: string) => {
    switch (type) {
      case "01": // DNI
        return dni(value);
      case "04": // Carnet de extranjería
        return carnetExtranjeria(value);
      case "06": // RUC
        return ruc(value);
      case "07": // Pasaporte
        return passport(value);
      case "11": // Partida de nacimiento-identidad
        return birthCertificate(value);
      default: // Otro
        return true;
    }
  };
};

export const minLength = (min: number) => {
  return (value: string) => {
    return value.length >= min || `Mínimo ${min} caracteres`;
  };
};

export const maxLength = (max: number) => {
  return (value: string) => {
    return value.length <= max || `Máximo ${max} caracteres`;
  };
};

export const isNumber = (value: any) => {
  return !isNaN(value) || "Debe ser un número";
};

export const onlyLetters = (value: string) => {
  const pattern = /^[a-zA-Z]+$/;
  return pattern.test(value) || "Solo se permiten letras";
};

export const matchField = (field: string, fieldName: string) => {
  return (value: any, allValues: any) => {
    return value === allValues[field] || `${fieldName} no coincide`;
  };
};

export const atLeastOneRequired = (otherField: any) => {
  return (value: any) => {
    return (
      !!value ||
      !!otherField ||
      "Al menos un apellido (Paterno o Materno) es obligatorio"
    );
  };
};
