import React from "react";
import { Container } from "@mui/material";

import Category from "@/components/common/Category";

import HomePageRecipePreviewCard from "../RecipePreviewCard";

const HomePageContent = React.memo(() => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", gap: 4, py: 4, mt: 2 }}
    >
      <Category id={undefined} title="What's new" />
      <Category id={undefined} title="Trending" />
      <Category id={undefined} title="For you" />
      <HomePageRecipePreviewCard />
      <Category id={5} title="Main Dish" />
      <Category id={1} title="Starters" />
      <Category id={9} title="Deserts" />
      <Category id={13} title="First course" />
    </Container>
  );
});
export default HomePageContent;
