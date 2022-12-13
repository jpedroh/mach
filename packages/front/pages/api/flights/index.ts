import { FlightModel } from "@mach/database";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import NextCors from "nextjs-cors";

const schema = z.object({
  departureIcao: z.string().optional(),
  arrivalIcao: z.string().optional(),
  company: z.string().optional(),
  limit: z.number().positive().optional().default(15),
  offset: z.number().min(0).optional().default(0),
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
  });

  res.status(200).json({ count, items });
};
