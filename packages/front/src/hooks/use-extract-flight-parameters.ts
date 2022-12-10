import { useRouter } from "next/router";

export function useExtractFlightParameters() {
  const params = useRouter().query;

  let query: Record<string, string> = {};

  if (params?.departureIcao) {
    query.departureIcao = params?.departureIcao!.toString().toUpperCase();
  }
  if (params?.arrivalIcao) {
    query.arrivalIcao = params?.arrivalIcao!.toString().toUpperCase();
  }

  return query;
}
