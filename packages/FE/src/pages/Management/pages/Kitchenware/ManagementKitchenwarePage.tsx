import { useMemo } from "react";
import Box from "@mui/material/Box";
import { Trans, useTranslation } from "react-i18next";

import DataTable from "@/components/common/DataTable";
import { MultiSelectOption } from "@/components/ui/multi-select";
import { useDeleteKitchenware, useMergeKitchenware, useSuspenseGetKitchenware } from "@/queries/kitchenware";
import { languages } from "@/types/user";

import ManagementItemsPageContext, { useManagementItemsGetContextValues } from "../../context/ManagementItemsPage";
import ManagementPageConfirmDeleteModal from "../../modals/ConfirmDelete";
import ManagementPageMergeModal from "../../modals/Merge";
import { columns } from "./columns";
import ManagementKitchenwarePageContext, { useManagementKitchenwarePageGetContextValues } from "./Context";
import ManagementKitchenwarePageForm from "./Form";
import { ManagementKitchenwareValue } from "./types";

const ManagementKitchenwarePage = () => {
  const { t } = useTranslation();
  const contextValues = useManagementItemsGetContextValues();
  const kitchenwareContextValues = useManagementKitchenwarePageGetContextValues();
  const { isConfirmModalOpen, selectedItem, closeConfirmModal } = contextValues;
  const { isMergeModalOpen, closeMergeModal } = kitchenwareContextValues;

  const { data } = useSuspenseGetKitchenware();

  const kitchenware = useMemo<ManagementKitchenwareValue[]>(
    () =>
      data.map(tool => ({
        ...tool,
        isFullyTranslated: Object.keys(tool.content).length === languages.length,
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

  const { mutateAsync: deleteAsync } = useDeleteKitchenware();
  const { mutateAsync: mergeAsync } = useMergeKitchenware();

  const onConfirmClicked = async () => {
    if (selectedItem) await deleteAsync(selectedItem);
    closeConfirmModal();
  };

  const onMergeKitchenware = async (values: string[]) => {
    if (selectedItem) await mergeAsync({ targetId: selectedItem, toolIds: values });
    closeMergeModal();
  };

  return (
    <Box p={[6, 6, 6, 8]}>
      <ManagementItemsPageContext value={contextValues}>
        <ManagementKitchenwarePageForm />
        <ManagementKitchenwarePageContext value={kitchenwareContextValues}>
          <DataTable columns={columns} data={kitchenware} />
          <ManagementPageConfirmDeleteModal
            buttonText={t("pages.management.kitchenware.modals.confirm_delete.button_text")}
            description={<Trans i18nKey="pages.management.kitchenware.modals.confirm_delete.description" />}
            onButtonClicked={onConfirmClicked}
            onOpenChange={closeConfirmModal}
            open={isConfirmModalOpen}
            title={t("pages.management.kitchenware.modals.confirm_delete.title")}
          />
          <ManagementPageMergeModal
            onButtonClicked={onMergeKitchenware}
            onOpenChange={closeMergeModal}
            open={isMergeModalOpen}
            options={mergeOptions}
            title={t("pages.management.kitchenware.modals.merge.title")}
          />
        </ManagementKitchenwarePageContext>
      </ManagementItemsPageContext>
    </Box>
  );
};

export default ManagementKitchenwarePage;
