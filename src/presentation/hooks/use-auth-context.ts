import { useContext } from "react";
import { AuthContext, IContext } from "../contexts";

export const useAuth = () => useContext<IContext>(AuthContext);
