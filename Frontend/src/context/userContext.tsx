import React, { createContext, useState } from "react";
import type { UserGetMe } from "@/types/userTypes";

export interface AuthUserContextTypes {
  authUser: UserGetMe | null;
  setAuthUser: React.Dispatch<React.SetStateAction<UserGetMe | null>>;
}

export const AuthUserContext = createContext<AuthUserContextTypes | null>(null);

export const AuthUserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<UserGetMe | null>(null);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserContextProvider;
