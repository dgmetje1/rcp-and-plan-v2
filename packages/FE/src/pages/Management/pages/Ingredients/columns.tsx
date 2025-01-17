/* eslint-disable react-hooks/rules-of-hooks */

import { ColumnDef } from "@tanstack/react-table";
import { useTranslation } from "react-i18next";

import { Ingredient } from "@/types/ingredients";

import ManagementIngredientsPageTableActions from "./TableActions";

export const columns: ColumnDef<Ingredient>[] = [
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
    id: "actions",
    header: "",
    cell: ({ row }) => <ManagementIngredientsPageTableActions id={row.original.id} />,
    size: 30,
  },
];
