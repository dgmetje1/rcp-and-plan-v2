import {
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  useQuery,
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
