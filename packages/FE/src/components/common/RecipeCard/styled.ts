import { Box, styled } from "@mui/material";

const StyledRecipeCard = styled(Box)``;

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

export const StyledRecipeCardOverlay = styled(Box)`
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
`;

StyledRecipeCardOverlay.defaultProps = {
  display: "flex",
  position: "absolute",
  bottom: "-1px",
  width: "100%",
  p: 1,
};
