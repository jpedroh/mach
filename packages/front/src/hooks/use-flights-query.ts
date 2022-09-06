import Flight from '@mach/common';
import { useInfiniteQuery } from '@tanstack/react-query';
import http from "../utils/http";

export type FlightsQuery = Partial<{
  departureIcao: string;
  arrivalIcao: string;
}>

type FlightsResponse = {
  items: Flight[];
  count: number;
}

function fetchFlights(query: FlightsQuery & { offset: number }) {
  return http<FlightsResponse>({ url: '//mach-api.herokuapp.com/flights', query: { ...query, limit: 30 } })
}

export function useFlightsQuery(params: FlightsQuery) {
  const query = useInfiniteQuery({
    queryKey: ['flights', params.departureIcao, params.arrivalIcao],
    queryFn: ({ pageParam: offset = 0 }) => fetchFlights({ ...params, offset }),
    getNextPageParam: (_, allPages) => allPages.reduce((prev, cur) => prev + cur.items.length, 0)
  })

  return {
    ...query,
    data: query.data?.pages.flatMap(v => v.items) ?? [],
    totalItems: query.data?.pages[0].count ?? 0
  }
}