import { DialogProps } from "@/components/ui/dialog";

export type ManagementPageConfirmDeleteModalProps = DialogProps & {
  title: string;
  description: string;
  buttonText: string;
  onButtonClicked: VoidFunction;
};
