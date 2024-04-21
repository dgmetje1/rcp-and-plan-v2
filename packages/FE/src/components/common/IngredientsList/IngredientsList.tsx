import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { IngredientsListProps } from "./types";

const IngredientsList = ({
  items,
  title,
  shouldSeeMoreBeShown,
}: IngredientsListProps) => (
  <>
    {title}
    <Box component="ul" display="flex" flexDirection="column">
      {items.map(ingredient => (
        <Box component="li" key={ingredient.id}>
          <Typography>
            {`${ingredient.quantity} ${ingredient.units.shortName} de ${ingredient.name.toLocaleLowerCase()}`}
          </Typography>
        </Box>
      ))}
      {shouldSeeMoreBeShown && (
        <Box component="li">
          <Typography fontWeight={600}>...</Typography>
        </Box>
      )}
    </Box>
  </>
);

export default IngredientsList;
