import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Unit } from "@/types/unit";

export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: "id",
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      return t("pages.management.units.table.id");
    },
  },

  {
    accessorKey: "content.en.name",
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      return t("pages.management.units.table.name");
    },
  },
  {
    accessorKey: "content.en.singularName",
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      return t("pages.management.units.table.singular_name");
    },
  },
  {
    accessorKey: "content.en.shortName",
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      return t("pages.management.units.table.short_name");
    },
  },
  {
    accessorKey: "isVisible",
    header: () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { t } = useTranslation();
      return t("pages.management.units.table.visibility");
    },
    cell: props => (props.cell.getValue() ? "Visible" : "Not visible"),
  },
];
