import { useQuery, UseQueryOptions, QueryKey } from "@tanstack/react-query";

type ApiQueryOptions<TData> = Omit<
  UseQueryOptions<TData, Error, TData, QueryKey>,
  "queryKey" | "queryFn"
>;

export function useApiQuery<TData>(
  key: QueryKey,
  fetcher: () => Promise<TData>,
  options?: ApiQueryOptions<TData>
) {
  return useQuery<TData, Error>({
    queryKey: key,
    queryFn: fetcher,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    ...options,
  });
}
