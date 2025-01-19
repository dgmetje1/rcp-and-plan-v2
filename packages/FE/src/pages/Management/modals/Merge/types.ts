import { DialogProps } from "@/components/ui/dialog";
import { MultiSelectOption } from "@/components/ui/multi-select";

export type ManagementPageMergeModalProps = DialogProps & {
  title: string;
  options: MultiSelectOption[];
  onButtonClicked: (values: string[]) => void;
};
