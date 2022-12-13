import { FlightModel } from "@mach/database";
import z from "zod";

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
});

export function fetchFlights(searchParams: Record<string, unknown>) {
  const where = schema.parse(searchParams);
  return FlightModel.findAll({
    where: {
      ...(where.departureIcao && { departureIcao: where.departureIcao }),
      ...(where.arrivalIcao && { arrivalIcao: where.arrivalIcao }),
      ...(where.company && { company: where.company }),
    },
    attributes: {
      exclude: ["createdAt", "updatedAt", "beginDate", "endDate"],
    },
    raw: true,
  });
}
