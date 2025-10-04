import bcrypt from "bcryptjs";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const hp = await bcrypt.hash(password, 10);
    return hp;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error hashing password:", err);
      throw new Error("Error hashing password: " + err.message);
    } else {
      console.error("Unexpected error:", err);
      throw new Error("An unknown error occurred while hashing password.");
    }
  }
};

export const matchPassword = async (
  enteredPassword: string,
  realPassword: string,
): Promise<boolean> => {
  try {
    const matched = await bcrypt.compare(enteredPassword, realPassword);
    return matched;
  } catch (err) {
    if (err instanceof Error) {
      console.error("Error veryfying password:", err);
      throw new Error("Error verifying password: " + err.message);
    } else {
      console.error("Unexpected error:", err);
      throw new Error("An unknown error occurred while verfying password.");
    }
  }
};
