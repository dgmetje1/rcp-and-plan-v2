import { createContext, useContext } from "react";

import { TabsContextValues } from "./types";

const TabsContext = createContext<TabsContextValues>({} as never);

export const useTabsContext = () => useContext(TabsContext);

export default TabsContext;
