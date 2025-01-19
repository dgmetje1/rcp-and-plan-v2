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
import { useManagementIngredientsPageContext } from "../Context";
import { ManagementIngredientsPageTableActionsProps } from "./types";

const ManagementIngredientsPageTableActions = ({ id }: ManagementIngredientsPageTableActionsProps) => {
  const { t } = useTranslation();
  const {
    setSelectedItem: setSelectedIngredient,
    toggleFormOpen,
    toggleConfirmModalOpen,
  } = useManagementItemsPageContext();
  const { toggleMergeModalOpen } = useManagementIngredientsPageContext();

  const onEditClicked = useCallback(() => {
    setSelectedIngredient(id);
    toggleFormOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onDeleteClicked = useCallback(() => {
    setSelectedIngredient(id);
    toggleConfirmModalOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onMergeClicked = useCallback(() => {
    setSelectedIngredient(id);
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

export default ManagementIngredientsPageTableActions;
