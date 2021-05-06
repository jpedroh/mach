import { GetFlightsQuery } from '../actions/get-flights'

export default function sanitizeParameters(params: Partial<GetFlightsQuery>) {
  return Object.fromEntries(
    Object.entries(params).filter(([_, v]) => v != '')
  ) as GetFlightsQuery
}
