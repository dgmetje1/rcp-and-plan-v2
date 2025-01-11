export type ManagementUnitsPageContextValues = {
  selectedUnit: string | undefined;
  setSelectedUnit: (selectedUnit: string | undefined) => void;
  isFormOpen: boolean;
  toggleFormOpen: () => void;
  closeForm: () => void;
};
