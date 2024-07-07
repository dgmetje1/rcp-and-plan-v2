import Box from "@mui/material/Box";

import { useSuspenseGetUnits } from "@/queries/units";

import { columns } from "./columns";
import ManagementUnitsPageTable from "./Table";

const ManagementUnitsPage = () => {
  const { data: units } = useSuspenseGetUnits();
  return (
    <Box p={5}>
      <ManagementUnitsPageTable columns={columns} data={units} />
    </Box>
  );
};

export default ManagementUnitsPage;
