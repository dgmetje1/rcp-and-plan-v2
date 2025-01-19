export const API_ACTION_BASE = "kitchenware";

export const getKitchenwareKeys = () => {
  const queryKey = [API_ACTION_BASE, "getKitchenware"];
  const key = queryKey.join("/");

  return { key, queryKey };
};
