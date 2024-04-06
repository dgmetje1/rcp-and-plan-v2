import { Box, styled } from "@mui/material";

export const StyledRecipeCardOverlay = styled(Box)`
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
`;

StyledRecipeCardOverlay.defaultProps = {
  display: "flex",
  position: "absolute",
  bottom: "-1px",
  width: "100%",
  maxWidth: 250,
  p: 1,
};

const StyledRecipeCard = styled(Box)`
  a {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    color: inherit;
  }

  a:hover .overlay {
    transform: scaleY(1.05);
  }

  img {
    object-fit: cover;
  }
`;

StyledRecipeCard.defaultProps = {
  display: "flex",
  position: "relative",
  flex: "0 0 250px",
  maxWidth: 250,
  maxHeight: 250,
  borderRadius: 0.5,
  overflow: "hidden",
};

export default StyledRecipeCard;
