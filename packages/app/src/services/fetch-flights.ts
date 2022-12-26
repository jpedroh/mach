import { FlightModel } from "@mach/database";
import { Op } from "sequelize";
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
  onlyCurrent: z
    .string()
    .transform((v) => Boolean(v))
    .optional(),
});

export function fetchFlights(searchParams: Record<string, unknown>) {
  const today = new Date();

  const where = schema.parse(searchParams);
  return FlightModel.findAll({
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
}
