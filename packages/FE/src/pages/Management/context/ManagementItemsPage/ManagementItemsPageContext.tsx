import { createContext, useContext, useMemo, useState } from "react";

import useToggle from "@/lib/hooks/useToggle";

import { ManagementItemsPageContextValues } from "./types";

const ManagementItemsPageContext = createContext<ManagementItemsPageContextValues>({} as never);

export default ManagementItemsPageContext;

export const useManagementItemsPageContext = () => useContext(ManagementItemsPageContext);

export const useManagementItemsGetContextValues = () => {
  const [selectedItem, setSelectedItem] = useState<string | undefined>();
  const [isFormOpen, toggleFormOpen, closeForm] = useToggle();
  const [isConfirmModalOpen, toggleConfirmModalOpen, closeConfirmModal] = useToggle();

  const contextValues = useMemo(
    () => ({
      selectedItem,
      setSelectedItem,
      isFormOpen,
      toggleFormOpen,
      closeForm,
      isConfirmModalOpen,
      toggleConfirmModalOpen,
      closeConfirmModal,
    }),
    [
      closeConfirmModal,
      closeForm,
      isConfirmModalOpen,
      isFormOpen,
      selectedItem,
      toggleConfirmModalOpen,
      toggleFormOpen,
    ],
  );

  return contextValues;
};
