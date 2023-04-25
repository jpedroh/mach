import { FlightModel } from "@mach/database";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import { Op } from "sequelize";
import z from "zod";

const schema = z
  .object({
    departureIcao: z
      .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
      .transform((values) => values.map((value) => value.toUpperCase()))
      .optional(),
    arrivalIcao: z
      .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
      .transform((values) => values.map((value) => value.toUpperCase()))
      .optional(),
    company: z
      .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
      .transform((values) => values.map((value) => value.toUpperCase()))
      .optional(),
    aircraftIcaoCode: z
      .preprocess((x) => (Array.isArray(x) ? x : [x]), z.array(z.string()))
      .transform((values) => values.map((value) => value.toUpperCase()))
      .optional(),
    limit: z.preprocess(
      (x) => (x ? Number(x) : undefined),
      z.number().min(1).default(15)
    ),
    offset: z.preprocess(
      (x) => (x ? Number(x) : undefined),
      z.number().min(0).default(0)
    ),
  })
  .transform(({ aircraftIcaoCode, ...rest }) => {
    return {
      ...rest,
      ...(aircraftIcaoCode && {
        aircraft: {
          icaoCode: {
            [Op.in]: aircraftIcaoCode,
          },
        },
      }),
    };
  });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, { methods: ["GET"], origin: "*" });

  const data = schema.safeParse(req.query);

  if (!data.success) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const { limit, offset, ...where } = data.data;

  const { count, rows: items } = await FlightModel.findAndCountAll({
    where,
    limit,
    offset,
    order: ["id"],
  });

  res.status(200).json({ count, items });
};
