import Box from "@mui/material/Box";
import { Trans, useTranslation } from "react-i18next";

import DataTable from "@/components/common/DataTable";
import { useDeleteUnit, useSuspenseGetUnits } from "@/queries/units";

import ManagementItemsPageContext, { useManagementItemsGetContextValues } from "../../context/ManagementItemsPage";
import ManagementPageConfirmDeleteModal from "../../modals/ConfirmDelete";
import { columns } from "./columns";
import ManagementUnitsPageForm from "./Form";

const ManagementUnitsPage = () => {
  const { t } = useTranslation();
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
          buttonText={t("pages.management.units.modals.confirm_delete.button_text")}
          description={<Trans i18nKey="pages.management.units.modals.confirm_delete.description" />}
          onButtonClicked={onConfirmClicked}
          onOpenChange={closeConfirmModal}
          open={isConfirmModalOpen}
          title={t("pages.management.units.modals.confirm_delete.title")}
        />
      </ManagementItemsPageContext>
    </Box>
  );
};

export default ManagementUnitsPage;
