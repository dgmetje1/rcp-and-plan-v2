import {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
  useSuspenseQuery,
  UseSuspenseQueryOptions,
} from "@tanstack/react-query";

export const useApiQuery = <T,>(
  actionKey: string,
  queryKey: QueryKey,
  queryFn: QueryFunction<T>,
  queryConfig?: Omit<UndefinedInitialDataOptions<T>, "queryKey">,
) => {
  return useQuery({ queryKey, queryFn, ...queryConfig });
};

export const useSuspenseApiQuery = <T, Q extends QueryKey>(
  actionKey: string,
  queryOptions: UseSuspenseQueryOptions<T, Error, T, Q>,
) => {
  return useSuspenseQuery(queryOptions);
};

export const useApiMutation = <T,>(
  actionKey: string,
  mutationFn: MutationFunction<unknown, T>,
  mutationConfig?: Omit<UseMutationOptions<unknown, Error, T>, "mutationFn">,
) => {
  return useMutation({ mutationFn, ...mutationConfig });
};
