import { useCallback } from "react";
import { MoreVert } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useManagementItemsPageContext } from "../../../context/ManagementItemsPage";
import { useManagementKitchenwarePageContext } from "../Context";
import { ManagementKitchenwarePageTableActionsProps } from "./types";

const ManagementKitchenwarePageTableActions = ({ id }: ManagementKitchenwarePageTableActionsProps) => {
  const { t } = useTranslation();
  const { setSelectedItem: setSelectedTool, toggleFormOpen, toggleConfirmModalOpen } = useManagementItemsPageContext();
  const { toggleMergeModalOpen } = useManagementKitchenwarePageContext();

  const onEditClicked = useCallback(() => {
    setSelectedTool(id);
    toggleFormOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onDeleteClicked = useCallback(() => {
    setSelectedTool(id);
    toggleConfirmModalOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onMergeClicked = useCallback(() => {
    setSelectedTool(id);
    toggleMergeModalOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <DropdownMenu>
      <div className="flex justify-end">
        <DropdownMenuTrigger>
          <MoreVert />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditClicked}>{t("common.buttons.edit")}</DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteClicked}>{t("common.buttons.delete")}</DropdownMenuItem>
        <DropdownMenuItem onClick={onMergeClicked}>{t("common.buttons.merge")}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManagementKitchenwarePageTableActions;
