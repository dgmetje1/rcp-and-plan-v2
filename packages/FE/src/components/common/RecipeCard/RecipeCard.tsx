import { Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";

import config from "@/config";

import StyledRecipeCard, { StyledRecipeCardOverlay } from "./styled";
import { RecipeCardProps } from "./types";

const RecipeCard = ({ id, title, thumbnail_url }: RecipeCardProps) => {
  return (
    <StyledRecipeCard>
      <Link params={{ id: id.toString() }} to="/recipe/$id">
        <img src={`${config.cdnUrl}/${thumbnail_url}`} width="100%" />
        <StyledRecipeCardOverlay className="overlay">
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
      </Link>
    </StyledRecipeCard>
  );
};

export default RecipeCard;
