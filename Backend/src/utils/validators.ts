interface validatorResponse {
  isValid: boolean;
  message?: string;
}

export const validateUsername = (username: string): validatorResponse => {
  const u = username.trim();

  if (u === "" || u.length === 0) {
    return { isValid: false, message: "Username required." };
  }

  if (u.length < 3 || u.length > 12) {
    return {
      isValid: false,
      message: "Username must be between 3 and 12 characters.",
    };
  }

  return { isValid: true };
};

export const validatePasswordStrenght = (
  password: string,
): validatorResponse => {
  const p = password.trim();

  if (p === "" || p.length === 0) {
    return { isValid: false, message: "Password required." };
  }

  if (p.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long.",
    };
  }

  if (!/[A-Z]/.test(p)) {
    return {
      isValid: false,
      message: "Password must include at least one uppercase letter.",
    };
  }

  if (!/[a-z]/.test(p)) {
    return {
      isValid: false,
      message: "Password must include at least one lowercase letter.",
    };
  }

  if (!/[0-9]/.test(p)) {
    return {
      isValid: false,
      message: "Password must include at least one number.",
    };
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(p)) {
    return {
      isValid: false,
      message: "Password must include at least one special character.",
    };
  }

  return { isValid: true };
};

export const validateEmailFormmate = (email: string): validatorResponse => {
  const e = email.trim();

  if (e.length === 0 || e === "") {
    return { isValid: false, message: "Email required." };
  }

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!isValid) {
    return { isValid: false, message: "Invalid email formatte." };
  }

  return { isValid: true };
};

export const validatePostDescription = (des: string): validatorResponse => {
  if (des.trim().length > 300) {
    return {
      isValid: false,
      message: "Desciption can't exceed 300 charcters.",
    };
  }

  return { isValid: true };
};

export const validatePostlocation = (loc: string): validatorResponse => {
  if (loc.trim().length > 100) {
    return {
      isValid: false,
      message: "Location can't exceed 100 charcters.",
    };
  }
  return { isValid: true };
};
