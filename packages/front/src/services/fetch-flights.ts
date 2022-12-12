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

export function fetchFlights(query: FlightsQuery) {
  return http<FlightsResponse>({
    url: "https://mach-api-production.up.railway.app/flights",
    query: { limit: Number.MAX_SAFE_INTEGER, ...query },
  });
}
