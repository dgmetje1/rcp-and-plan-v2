import Box from "@mui/material/Box";

import DataTable from "@/components/common/DataTable";
import { useDeleteUnit, useSuspenseGetUnits } from "@/queries/units";

import ManagementItemsPageContext, { useManagementItemsGetContextValues } from "../../context/ManagementItemsPage";
import ManagementPageConfirmDeleteModal from "../../modals/ConfirmDelete";
import { columns } from "./columns";
import ManagementUnitsPageForm from "./Form";

const ManagementUnitsPage = () => {
  const contextValues = useManagementItemsGetContextValues();
  const { isConfirmModalOpen, selectedItem, closeConfirmModal } = contextValues;

  const { data: units } = useSuspenseGetUnits();

  const { mutateAsync: deleteAsync } = useDeleteUnit();

  const onConfirmClicked = async () => {
    if (selectedItem) await deleteAsync(selectedItem);
    closeConfirmModal();
  };

  return (
    <Box p={[6, 6, 6, 8]}>
      <ManagementItemsPageContext value={contextValues}>
        <ManagementUnitsPageForm />
        <DataTable columns={columns} data={units} />
        <ManagementPageConfirmDeleteModal
          buttonText="Confirm"
          description="This action cannot be undone. Are you sure you want to permanently delete this file from our servers?"
          onButtonClicked={onConfirmClicked}
          onOpenChange={closeConfirmModal}
          open={isConfirmModalOpen}
          title="Are you absolutely sure?"
        />
      </ManagementItemsPageContext>
    </Box>
  );
};

export default ManagementUnitsPage;
