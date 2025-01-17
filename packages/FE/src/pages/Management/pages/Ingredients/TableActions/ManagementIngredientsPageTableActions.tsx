import { useCallback } from "react";
import { MoreVert } from "@mui/icons-material";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useManagementItemsPageContext } from "../../../context/ManagementItemsPage";
import { ManagementIngredientsPageTableActionsProps } from "./types";

const ManagementIngredientsPageTableActions = ({ id }: ManagementIngredientsPageTableActionsProps) => {
  const {
    setSelectedItem: setSelectedIngredient,
    toggleFormOpen,
    toggleConfirmModalOpen,
  } = useManagementItemsPageContext();

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

  return (
    <DropdownMenu>
      <div className="flex justify-end">
        <DropdownMenuTrigger>
          <MoreVert />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditClicked}>Edit</DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteClicked}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ManagementIngredientsPageTableActions;
