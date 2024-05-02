import { createContext, useContext } from "react";

import { AuthContextValues } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AuthContext = createContext<AuthContextValues>({} as any);

export const useAuthContext = () => useContext<AuthContextValues>(AuthContext);

export default AuthContext;
