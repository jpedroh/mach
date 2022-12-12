import Flight from "@mach/common";
import http from "../utils/http";

export type FlightsQuery = Partial<{
  departureIcao: string;
  arrivalIcao: string;
}>;

type FlightsResponse = {
  items: Flight[];
  count: number;
};

export function fetchFlights(params: FlightsQuery) {
  const query: Record<string, string> = {};

  if (params?.departureIcao) {
    query.departureIcao = params?.departureIcao!.toString().toUpperCase();
  }
  if (params?.arrivalIcao) {
    query.arrivalIcao = params?.arrivalIcao!.toString().toUpperCase();
  }

  return http<FlightsResponse>({
    url: "https://mach-api-production.up.railway.app/flights",
    query: { ...query, limit: 15000 },
  }).then((data) => data.items);
}
