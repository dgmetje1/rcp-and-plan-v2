import { queryOptions } from "@tanstack/react-query";

import { User } from "@/types/user";

import { getUserKeys, getUserSummaryKeys } from "./keys";
import { getUser, getUserSummary } from "./queries";

export const getUserOptions = () => {
  const { queryKey } = getUserKeys();
  return queryOptions({
    queryKey,
    queryFn: () => getUser(),
  });
};

export const getUserSummaryOptions = (userId: User["id"]) => {
  const { queryKey } = getUserSummaryKeys(userId);
  return queryOptions({
    queryKey,
    queryFn: () => getUserSummary(userId),
  });
};
