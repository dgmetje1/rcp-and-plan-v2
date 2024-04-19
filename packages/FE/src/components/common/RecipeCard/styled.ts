import { Box, styled } from "@mui/material";

export const StyledRecipeCardOverlay = styled(Box)`
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(4px);
`;

StyledRecipeCardOverlay.defaultProps = {
  bottom: 0,
  display: "flex",
  position: "absolute",
  maxWidth: 250,
  p: 1,
  width: "100%",
};

const StyledRecipeCard = styled(Box)`
  a {
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    color: inherit;
  }

  a .overlay .MuiTypography-root {
    transition: all 150ms ease-in-out;
    color: #333;
  }

  a:hover .overlay .MuiTypography-root {
    font-weight: 600;
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
  borderRadius: 1,
  overflow: "hidden",
};

export default StyledRecipeCard;
