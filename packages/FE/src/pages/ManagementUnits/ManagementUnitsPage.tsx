import { useMemo, useState } from "react";
import Box from "@mui/material/Box";

import useToggle from "@/lib/hooks/useToggle";
import { useSuspenseGetUnits } from "@/queries/units";

import { columns } from "./columns";
import ManagementUnitsPageContext from "./Context";
import ManagementUnitsPageForm from "./Form";
import ManagementUnitsPageTable from "./Table";

const ManagementUnitsPage = () => {
  const [selectedUnit, setSelectedUnit] = useState<string | undefined>();
  const [isFormOpen, toggleFormOpen, closeForm] = useToggle();

  const { data: units } = useSuspenseGetUnits();

  const contextValues = useMemo(
    () => ({ selectedUnit, setSelectedUnit, isFormOpen, toggleFormOpen, closeForm }),
    [closeForm, isFormOpen, selectedUnit, toggleFormOpen],
  );

  return (
    <Box p={[6, 6, 6, 8]}>
      <ManagementUnitsPageContext value={contextValues}>
        <ManagementUnitsPageForm />
        <ManagementUnitsPageTable columns={columns} data={units} />
      </ManagementUnitsPageContext>
    </Box>
  );
};

export default ManagementUnitsPage;
