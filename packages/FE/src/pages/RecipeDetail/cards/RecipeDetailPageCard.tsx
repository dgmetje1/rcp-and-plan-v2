import { type PropsWithChildren } from "react";
import Paper, { type PaperProps } from "@mui/material/Paper";

const RecipeDetailPageCard = ({
  children,
  ...rest
}: PropsWithChildren<PaperProps>) => (
  <Paper
    component="section"
    sx={{
      display: "flex",
      flexDirection: "column",
      p: { xs: 3, md: 4 },
      bgcolor: "#f0efef",
      gap: 1,
    }}
    {...rest}
  >
    {children}
  </Paper>
);

export default RecipeDetailPageCard;
