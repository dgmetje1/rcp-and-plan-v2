import React from "react";

import { HomePageContextValues } from "./types";

const HomePageContext = React.createContext<HomePageContextValues | undefined>(
  undefined,
);

export default HomePageContext;

export const useHomePageContext = () => {
  const context = React.useContext(HomePageContext);

  if (!context) {
    throw new Error(
      "useThemeContext must be used inside the HomePageContext.Provider component",
    );
  }

  return context;
};
