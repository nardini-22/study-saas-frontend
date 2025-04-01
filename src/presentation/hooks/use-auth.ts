import { useContext } from "react";
import { AuthContext, IContext } from "../contexts";

export function useAuth(): IContext {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
