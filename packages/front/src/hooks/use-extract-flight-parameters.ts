import { useLocation } from "react-router-dom"

export function useExtractFlightParameters() {
  const params = new URLSearchParams(useLocation().search)

  let query: Record<string, string> = {}

  if (params.get('departureIcao')) {
    query.departureIcao = params.get('departureIcao')!
  }
  if (params.get('arrivalIcao')) {
    query.arrivalIcao = params.get('arrivalIcao')!
  }

  return query
}