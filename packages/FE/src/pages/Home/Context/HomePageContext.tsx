import { createContext, useContext } from "react";

import { HomePageContextValues } from "./types";

const HomePageContext = createContext<HomePageContextValues | undefined>(undefined);

export default HomePageContext;

export const useHomePageContext = () => {
  const context = useContext(HomePageContext);

  if (!context) {
    throw new Error("useThemeContext must be used inside the HomePageContext.Provider component");
  }

  return context;
};
