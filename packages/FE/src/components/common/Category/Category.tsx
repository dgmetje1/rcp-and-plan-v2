import { Box, Typography } from "@mui/material";

import { useGetRecipes } from "@/queries/recipes";

import RecipeCard from "../RecipeCard";
import StyledCategory from "./styled";
import { CategoryProps } from "./types";

const Category = ({ title, id }: CategoryProps) => {
  const { data = [], isLoading } = useGetRecipes({ categoryId: id });

  if (isLoading) return null;
  return (
    <Box>
      {!!title && (
        <Typography color="#333" fontWeight="bold" gutterBottom variant="h4">
          {title}
        </Typography>
      )}
      <StyledCategory>
        {data.map(value => (
          <RecipeCard {...value} />
        ))}
      </StyledCategory>
    </Box>
  );
};

export default Category;
