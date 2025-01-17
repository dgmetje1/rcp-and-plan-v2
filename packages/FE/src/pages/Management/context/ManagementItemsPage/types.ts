export type ManagementItemsPageContextValues = {
  selectedItem: string | undefined;
  setSelectedItem: (selectedItem: string | undefined) => void;
  isFormOpen: boolean;
  toggleFormOpen: () => void;
  closeForm: () => void;
  isConfirmModalOpen: boolean;
  toggleConfirmModalOpen: () => void;
  closeConfirmModal: () => void;
};
