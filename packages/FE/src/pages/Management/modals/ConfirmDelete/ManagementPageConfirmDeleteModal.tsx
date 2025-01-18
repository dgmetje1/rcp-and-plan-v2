import { Button } from "@mui/material";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { ManagementPageConfirmDeleteModalProps } from "./types";

const ManagementPageConfirmDeleteModal = ({
  onOpenChange,
  open,
  title,
  description,
  buttonText,
  onButtonClicked,
}: ManagementPageConfirmDeleteModalProps) => {
  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onButtonClicked} type="submit">
            {buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManagementPageConfirmDeleteModal;
