import {
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export const useApiQuery = <T,>(
  actionKey: string,
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  queryConfig?: UndefinedInitialDataOptions<T>,
) => {
  console.log(actionKey);
  return useQuery({ queryKey, queryFn, ...queryConfig });
};

export const useSuspenseApiQuery = <T, Q extends QueryKey>(
  actionKey: string,
  queryOptions: UseSuspenseQueryOptions<T, Error, T, Q>,
) => {
  console.log(actionKey);
  return useSuspenseQuery(queryOptions);
};
