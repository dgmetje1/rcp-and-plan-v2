import { ColumnDef } from "@tanstack/react-table";

export interface ManagementUnitsPageTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}
