import { User } from "@/types/user";

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
export const getUserSummaryKeys = (userId: User["id"]) => {
  const baseQueryKey = [API_ACTION_BASE, "getUserSummary"];
  const key = baseQueryKey.join("/");

  const queryKey = [...baseQueryKey, userId];

  return { key, queryKey };
};
