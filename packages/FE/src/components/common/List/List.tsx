import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { ListItem, ListProps } from "./types";

const List = <T extends ListItem>({
  items,
  renderItem,
  title,
  shouldSeeMoreBeShown,
}: ListProps<T>) => (
  <>
    {title}
    <Box component="ul" display="flex" flexDirection="column">
      {items.map(item => (
        <Box component="li" key={item.id}>
          <Typography>{renderItem(item)}</Typography>
        </Box>
      ))}
      {shouldSeeMoreBeShown && (
        <Box component="li">
          <Typography fontWeight={600}>...</Typography>
        </Box>
      )}
    </Box>
  </>
);

export default List;
