import { Box, styled } from "@mui/material";

const StyledCategory = styled(Box)`
  scrollbar-width: 3px;

  &::-webkit-scrollbar {
    display: block;
  }

  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-margin-left: 8px;
  scroll-margin-right: 8px;

  > div {
    scroll-snap-align: start;
  }
`;

StyledCategory.defaultProps = {
  display: "flex",
  minHeight: 150,
  gap: 1,
};

export default StyledCategory;
