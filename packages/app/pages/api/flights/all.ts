import { FlightModel } from "@mach/database";
import type { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import z from "zod";

const schema = z.object({
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
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await NextCors(req, res, { methods: ["GET"], origin: "*" });

    const data = schema.safeParse(req.query);

    if (!data.success) {
      return res.status(400).json({ message: "Bad Request" });
    }

    const items = await FlightModel.findAll({
      where: { ...data.data },
      order: ["id"],
    });

    res.status(200).json(items);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
