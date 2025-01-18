import { useMemo } from "react";
import Box from "@mui/material/Box";
import { Trans, useTranslation } from "react-i18next";

import DataTable from "@/components/common/DataTable";
import { useDeleteIngredient, useSuspenseGetIngredients } from "@/queries/ingredients";
import { languages } from "@/types/user";

import ManagementItemsPageContext, { useManagementItemsGetContextValues } from "../../context/ManagementItemsPage";
import ManagementPageConfirmDeleteModal from "../../modals/ConfirmDelete";
import { columns } from "./columns";
import ManagementIngredientsPageForm from "./Form";
import { ManagementIngredientValue } from "./types";

const ManagementIngredientsPage = () => {
  const { t } = useTranslation();
  const contextValues = useManagementItemsGetContextValues();
  const { isConfirmModalOpen, selectedItem, closeConfirmModal } = contextValues;

  const { data } = useSuspenseGetIngredients();

  const ingredients = useMemo<ManagementIngredientValue[]>(
    () =>
      data.map(ingredient => ({
        ...ingredient,
        isFullyTranslated: Object.keys(ingredient.content).length === languages.length,
      })),
    [data],
  );

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
          buttonText={t("pages.management.ingredients.modals.confirm_delete.button_text")}
          description={<Trans i18nKey="pages.management.ingredients.modals.confirm_delete.description" />}
          onButtonClicked={onConfirmClicked}
          onOpenChange={closeConfirmModal}
          open={isConfirmModalOpen}
          title={t("pages.management.ingredients.modals.confirm_delete.title")}
        />
      </ManagementItemsPageContext>
    </Box>
  );
};

export default ManagementIngredientsPage;
