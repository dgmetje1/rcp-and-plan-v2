/* eslint-disable react-hooks/rules-of-hooks */

import { Cancel, CheckCircle } from "@mui/icons-material";
import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import ManagementIngredientsPageTableActions from "./TableActions";
import { ManagementIngredientValue } from "./types";

export const columns: ColumnDef<ManagementIngredientValue>[] = [
  {
    accessorKey: "id",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.ingredients.table.id");
    },
    size: 150,
  },

  {
    accessorKey: "content.en.name",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.ingredients.table.name");
    },
    size: 150,
  },
  {
    accessorKey: "content.en.singularName",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.ingredients.table.singular_name");
    },
    size: 150,
  },
  {
    accessorKey: "isFullyTranslated",
    header: () => {
      const { t } = useTranslation();
      return t("pages.management.ingredients.table.translated");
    },
    cell: props => (props.cell.getValue() ? <CheckCircle color="success" /> : <Cancel color="error" />),

    size: 150,
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => <ManagementIngredientsPageTableActions id={row.original.id} />,
    size: 30,
  },
];
