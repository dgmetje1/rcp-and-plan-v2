export const API_ACTION_BASE = "users";
export const ACCOUNT_API_ACTION_BASE = "account";

export const getAccountKeys = () => {
  const queryKey = [ACCOUNT_API_ACTION_BASE, "getAccount"];
  const key = queryKey.join("/");

  return { key, queryKey };
};

export const getUserKeys = () => {
  const queryKey = [API_ACTION_BASE, "getUser"];
  const key = queryKey.join("/");

  return { key, queryKey };
};
