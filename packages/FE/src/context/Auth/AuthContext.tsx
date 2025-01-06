import { createContext, useContext } from "react";

import { AuthContextValues } from "./types";

const AuthContext = createContext<AuthContextValues>({} as never);

export const useAuthContext = () => useContext<AuthContextValues>(AuthContext);

export default AuthContext;
