import { useContext } from "react";
import { AuthUserContext } from "./userContext";

export const useAuthUser = () => {
  const context = useContext(AuthUserContext);

  if (context === undefined || context == null) {
    throw new Error(
      "useAuthUser must be used within a AuthUserContextProvider",
    );
  }

  return context;
};
