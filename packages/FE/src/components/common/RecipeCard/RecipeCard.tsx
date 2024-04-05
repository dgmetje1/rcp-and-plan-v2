import { Typography } from "@mui/material";

import config from "@/config";

import StyledRecipeCard, { StyledRecipeCardOverlay } from "./styled";
import { RecipeCardProps } from "./types";

const RecipeCard = ({ title, thumbnail_url }: RecipeCardProps) => {
  return (
    <StyledRecipeCard>
      <img src={`${config.cdnUrl}/${thumbnail_url}`} width="100%" />
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
          {title}
        </Typography>
      </StyledRecipeCardOverlay>
    </StyledRecipeCard>
  );
};

export default RecipeCard;
