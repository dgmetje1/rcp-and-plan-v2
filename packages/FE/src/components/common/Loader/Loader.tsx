import { Box, CircularProgress } from "@mui/material";

const Loader = () => (
  <Box alignItems="center" display="flex" flexGrow={1} height="100%" justifyContent="center" width="100%">
    <CircularProgress size={64} />
  </Box>
);

export default Loader;
