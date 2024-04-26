import React from "react";

export type ListProps<T extends ListItem> = {
  items: T[];
  title: React.ReactNode;
  renderItem: (item: T) => React.ReactNode;
  shouldSeeMoreBeShown?: boolean;
};

export type ListItem = {
  id: string | number;
};
