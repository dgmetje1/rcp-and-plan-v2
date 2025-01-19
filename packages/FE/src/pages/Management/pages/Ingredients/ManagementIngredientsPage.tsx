import { useMemo } from "react";
import Box from "@mui/material/Box";
import { Trans, useTranslation } from "react-i18next";

import DataTable from "@/components/common/DataTable";
import { MultiSelectOption } from "@/components/ui/multi-select";
import { useDeleteIngredient, useMergeIngredients, useSuspenseGetIngredients } from "@/queries/ingredients";
import { languages } from "@/types/user";

import ManagementItemsPageContext, { useManagementItemsGetContextValues } from "../../context/ManagementItemsPage";
import ManagementPageConfirmDeleteModal from "../../modals/ConfirmDelete";
import ManagementPageMergeModal from "../../modals/Merge";
import { columns } from "./columns";
import ManagementIngredientsPageContext, { useManagementIngredientsPageGetContextValues } from "./Context";
import ManagementIngredientsPageForm from "./Form";
import { ManagementIngredientValue } from "./types";

const ManagementIngredientsPage = () => {
  const { t } = useTranslation();
  const contextValues = useManagementItemsGetContextValues();
  const ingredientContextValues = useManagementIngredientsPageGetContextValues();
  const { isConfirmModalOpen, selectedItem, closeConfirmModal } = contextValues;
  const { isMergeModalOpen, closeMergeModal } = ingredientContextValues;

  const { data } = useSuspenseGetIngredients();

  const ingredients = useMemo<ManagementIngredientValue[]>(
    () =>
      data.map(ingredient => ({
        ...ingredient,
        isFullyTranslated: Object.keys(ingredient.content).length === languages.length,
      })),
    [data],
  );

  const mergeOptions = useMemo(
    () =>
      data.reduce<MultiSelectOption[]>(
        (prev, curr) =>
          selectedItem === curr.id ? prev : [...prev, { value: curr.id, label: curr.content.en?.name ?? "" }],
        [],
      ),
    [data, selectedItem],
  );

  const { mutateAsync: deleteAsync } = useDeleteIngredient();
  const { mutateAsync: mergeAsync } = useMergeIngredients();

  const onConfirmClicked = async () => {
    if (selectedItem) await deleteAsync(selectedItem);
    closeConfirmModal();
  };

  const onMergeIngredients = async (values: string[]) => {
    if (selectedItem) await mergeAsync({ targetId: selectedItem, ingredientIds: values });
    closeMergeModal();
  };

  return (
    <Box p={[6, 6, 6, 8]}>
      <ManagementItemsPageContext value={contextValues}>
        <ManagementIngredientsPageForm />
        <ManagementIngredientsPageContext value={ingredientContextValues}>
          <DataTable columns={columns} data={ingredients} />
          <ManagementPageConfirmDeleteModal
            buttonText={t("pages.management.ingredients.modals.confirm_delete.button_text")}
            description={<Trans i18nKey="pages.management.ingredients.modals.confirm_delete.description" />}
            onButtonClicked={onConfirmClicked}
            onOpenChange={closeConfirmModal}
            open={isConfirmModalOpen}
            title={t("pages.management.ingredients.modals.confirm_delete.title")}
          />
          <ManagementPageMergeModal
            onButtonClicked={onMergeIngredients}
            onOpenChange={closeMergeModal}
            open={isMergeModalOpen}
            options={mergeOptions}
            title={t("pages.management.ingredients.modals.merge.title")}
          />
        </ManagementIngredientsPageContext>
      </ManagementItemsPageContext>
    </Box>
  );
};

export default ManagementIngredientsPage;
