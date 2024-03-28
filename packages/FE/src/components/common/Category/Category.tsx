import { Box, Typography } from "@mui/material";

import RecipeCard from "../RecipeCard";
import StyledCategory from "./styled";
import { CategoryProps } from "./types";

const Category = ({ title }: CategoryProps) => {
  return (
    <Box>
      {!!title && (
        <Typography color="#333" fontWeight="bold" gutterBottom variant="h4">
          {title}
        </Typography>
      )}
      <StyledCategory>
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </StyledCategory>
    </Box>
  );
};

export default Category;
