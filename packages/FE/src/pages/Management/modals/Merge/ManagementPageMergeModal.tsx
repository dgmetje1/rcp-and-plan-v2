import { useState } from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MultiSelect } from "@/components/ui/multi-select";

import { ManagementPageMergeModalProps } from "./types";

const ManagementPageMergeModal = ({
  options,
  onOpenChange,
  open,
  title,
  onButtonClicked,
}: ManagementPageMergeModalProps) => {
  const { t } = useTranslation();

  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <MultiSelect onValueChange={setSelectedOptions} options={options} />
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => onButtonClicked(selectedOptions)} type="submit">
            {t("common.buttons.merge")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ManagementPageMergeModal;
