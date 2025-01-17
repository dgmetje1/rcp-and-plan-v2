import Box from "@mui/material/Box";

import DataTable from "@/components/common/DataTable";
import { useDeleteIngredient, useSuspenseGetIngredients } from "@/queries/ingredients";

import ManagementItemsPageContext, { useManagementItemsGetContextValues } from "../../context/ManagementItemsPage";
import ManagementPageConfirmDeleteModal from "../../modals/ConfirmDelete";
import { columns } from "./columns";
import ManagementIngredientsPageForm from "./Form";

const ManagementIngredientsPage = () => {
  const contextValues = useManagementItemsGetContextValues();
  const { isConfirmModalOpen, selectedItem, closeConfirmModal } = contextValues;

  const { data: ingredients } = useSuspenseGetIngredients();

  const { mutateAsync: deleteAsync } = useDeleteIngredient();

  const onConfirmClicked = async () => {
    if (selectedItem) await deleteAsync(selectedItem);
    closeConfirmModal();
  };

  return (
    <Box p={[6, 6, 6, 8]}>
      <ManagementItemsPageContext value={contextValues}>
        <ManagementIngredientsPageForm />
        <DataTable columns={columns} data={ingredients} />
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

export default ManagementIngredientsPage;
