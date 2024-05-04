import { useMemo, useState } from "react";

import TabsContext from "./Context/TabsContext";
import { TabsProps } from "./types";

const Tabs = ({ children, defaultIndex = 0 }: TabsProps) => {
  const [index, setIndex] = useState(defaultIndex);

  const onTabChange = (newIndex: number) => {
    setIndex(newIndex);
  };

  const contextValues = useMemo(() => ({ index, onTabChange }), [index]);
  return (
    <TabsContext.Provider value={contextValues}>
      {children}
    </TabsContext.Provider>
  );
};
export default Tabs;
