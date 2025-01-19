import { createContext, useContext, useMemo } from "react";

import useToggle from "@/lib/hooks/useToggle";

import { ManagementKitchenwarePageContextValues } from "./types";

const ManagementKitchenwarePageContext = createContext<ManagementKitchenwarePageContextValues>({} as never);

export default ManagementKitchenwarePageContext;

export const useManagementKitchenwarePageContext = () => useContext(ManagementKitchenwarePageContext);

export const useManagementKitchenwarePageGetContextValues = () => {
  const [isMergeModalOpen, toggleMergeModalOpen, closeMergeModal] = useToggle();

  const contextValues = useMemo(
    () => ({ isMergeModalOpen, toggleMergeModalOpen, closeMergeModal }),
    [isMergeModalOpen, toggleMergeModalOpen, closeMergeModal],
  );

  return contextValues;
};
