import { FlightModel } from "@mach/database";
import { Op } from "sequelize";
import z from "zod";
import { fetchAirportsData } from "./fetch-airports";

const schema = z.object({
  departureIcao: z
    .string()
    .transform((v) => v.toUpperCase())
    .optional(),
  arrivalIcao: z
    .string()
    .transform((v) => v.toUpperCase())
    .optional(),
  company: z
    .string()
    .transform((v) => v.toUpperCase())
    .optional(),
  onlyCurrent: z
    .string()
    .transform((v) => Boolean(v))
    .optional(),
});

export async function fetchFlights(searchParams: Record<string, unknown>) {
  const today = new Date();

  const where = schema.parse(searchParams);
  const flights = await FlightModel.findAll({
    where: {
      ...(where.departureIcao && { departureIcao: where.departureIcao }),
      ...(where.arrivalIcao && { arrivalIcao: where.arrivalIcao }),
      ...(where.company && { company: where.company }),
      ...(where.onlyCurrent && {
        beginDate: {
          [Op.lte]: today,
        },
        endDate: {
          [Op.or]: [{ [Op.is]: null }, { [Op.gte]: today }],
        } as any,
      }),
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "beginDate", "endDate"],
    },
    raw: true,
  });

  const icaos = flights.flatMap((flight) => [
    flight.departureIcao,
    flight.arrivalIcao,
  ]);

  const airports = await fetchAirportsData(icaos);

  return flights.map((flight) => {
    return {
      ...flight,
      departure: airports.find(
        ({ AeroCode }) => AeroCode === flight.departureIcao
      )!,
      arrival: airports.find(
        ({ AeroCode }) => AeroCode === flight.arrivalIcao
      )!,
    };
  });
}
