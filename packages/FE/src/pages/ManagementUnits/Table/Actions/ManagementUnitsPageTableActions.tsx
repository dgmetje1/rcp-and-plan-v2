import { useCallback } from "react";
import { MoreVert } from "@mui/icons-material";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteUnit } from "@/queries/units";

import { useManagementUnitsPageContext } from "../../Context";
import { ManagementUnitsPageTableActionsProps } from "./types";

const ManagementUnitsPageTableActions = ({ id }: ManagementUnitsPageTableActionsProps) => {
  const { setSelectedUnit, toggleFormOpen } = useManagementUnitsPageContext();

  const { mutateAsync: deleteAsync } = useDeleteUnit();

  const onEditClicked = useCallback(() => {
    setSelectedUnit(id);
    toggleFormOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onDeleteClicked = useCallback(() => {
    deleteAsync(id);
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
