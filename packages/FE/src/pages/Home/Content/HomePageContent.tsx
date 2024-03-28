import React from "react";
import { Container } from "@mui/material";

import Category from "@/components/common/Category";
import { useGetRecipes } from "@/queries/recipes";

import HomePageRecipePreviewCard from "../RecipePreviewCard";

const HomePageContent = React.memo(() => {
  const { data, isLoading } = useGetRecipes();
  console.log(data);
  console.log(isLoading);
  return (
    <Container
      maxWidth="xl"
      sx={{ display: "flex", flexDirection: "column", gap: 4, py: 4, mt: 2 }}
    >
      <Category title="What's new" />
      <Category title="Trending" />
      <Category title="For you" />
      <HomePageRecipePreviewCard />
      <Category title="Main Dish" />
      <Category title="Starters" />
      <Category title="Deserts" />
      <Category title="First course" />
    </Container>
  );
});
export default HomePageContent;
