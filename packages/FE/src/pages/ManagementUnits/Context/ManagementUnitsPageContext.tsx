import { createContext, useContext } from "react";

import { ManagementUnitsPageContextValues } from "./types";

const ManagementUnitsPageContext = createContext<ManagementUnitsPageContextValues>({} as never);

export default ManagementUnitsPageContext;

export const useManagementUnitsPageContext = () => useContext(ManagementUnitsPageContext);
