export const API_ACTION_BASE = "units";

export const getUnitsKeys = () => {
  const queryKey = [API_ACTION_BASE, "getUnits"];
  const key = queryKey.join("/");

  return { key, queryKey };
};
