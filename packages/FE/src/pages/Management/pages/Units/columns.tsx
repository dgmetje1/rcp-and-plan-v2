/* eslint-disable react-hooks/rules-of-hooks */

import { Cancel, CheckCircle } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Unit } from "@/types/unit";

import ManagementUnitsPageTableActions from "./TableActions";

export const columns: ColumnDef<Unit>[] = [
  {
    accessorKey: "id",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.units.table.id");
    },
    size: 150,
  },

  {
    accessorKey: "content.en.name",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.units.table.name");
    },
    size: 150,
  },
  {
    accessorKey: "content.en.singularName",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.units.table.singular_name");
    },
    size: 150,
  },
  {
    accessorKey: "content.en.shortName",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.units.table.short_name");
    },
    size: 50,
  },
  {
    accessorKey: "isVisible",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.units.table.visibility");
    },
    cell: props => (props.cell.getValue() ? <CheckCircle color="success" /> : <Cancel color="error" />),
    size: 50,
  },
  { id: "actions", header: "", cell: ({ row }) => <ManagementUnitsPageTableActions id={row.original.id} />, size: 30 },
];
