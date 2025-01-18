import { ReactNode } from "react";

import { DialogProps } from "@/components/ui/dialog";

export type ManagementPageConfirmDeleteModalProps = DialogProps & {
  title: string;
  description: string | ReactNode;
  buttonText: string;
  onButtonClicked: VoidFunction;
};
