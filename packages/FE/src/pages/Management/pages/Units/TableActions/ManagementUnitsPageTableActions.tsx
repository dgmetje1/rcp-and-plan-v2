import { useCallback } from "react";
import { MoreVert } from "@mui/icons-material";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useManagementItemsPageContext } from "../../../context/ManagementItemsPage";
import { ManagementUnitsPageTableActionsProps } from "./types";

const ManagementUnitsPageTableActions = ({ id }: ManagementUnitsPageTableActionsProps) => {
  const { setSelectedItem: setSelectedUnit, toggleFormOpen, toggleConfirmModalOpen } = useManagementItemsPageContext();

  const onEditClicked = useCallback(() => {
    setSelectedUnit(id);
    toggleFormOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onDeleteClicked = useCallback(() => {
    setSelectedUnit(id);
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

export default ManagementUnitsPageTableActions;
