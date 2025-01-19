import { createContext, useContext, useMemo } from "react";

import useToggle from "@/lib/hooks/useToggle";

import { ManagementIngredientsPageContextValues } from "./types";

const ManagementIngredientsPageContext = createContext<ManagementIngredientsPageContextValues>({} as never);

export default ManagementIngredientsPageContext;

export const useManagementIngredientsPageContext = () => useContext(ManagementIngredientsPageContext);

export const useManagementIngredientsPageGetContextValues = () => {
  const [isMergeModalOpen, toggleMergeModalOpen, closeMergeModal] = useToggle();

  const contextValues = useMemo(
    () => ({ isMergeModalOpen, toggleMergeModalOpen, closeMergeModal }),
    [isMergeModalOpen, toggleMergeModalOpen, closeMergeModal],
  );

  return contextValues;
};
