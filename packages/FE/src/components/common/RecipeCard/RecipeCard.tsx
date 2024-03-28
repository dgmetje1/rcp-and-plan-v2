import { faker } from "@faker-js/faker";
import { Typography } from "@mui/material";

import StyledRecipeCard, { StyledRecipeCardOverlay } from "./styled";

const RecipeCard = () => {
  return (
    <StyledRecipeCard>
      <img src={faker.image.urlLoremFlickr()} width="100%" />
      <StyledRecipeCardOverlay>
        <Typography
          sx={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "1",
            WebkitBoxOrient: "vertical",
          }}
          variant="body2"
        >
          {faker.lorem.words(4)}
        </Typography>
      </StyledRecipeCardOverlay>
    </StyledRecipeCard>
  );
};

export default RecipeCard;
