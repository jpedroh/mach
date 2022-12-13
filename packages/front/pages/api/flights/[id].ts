import { FlightModel } from "@mach/database";
import type { NextApiRequest, NextApiResponse } from "next";
import z from "zod";
import NextCors from "nextjs-cors";

const schema = z.object({
  id: z.string().uuid(),
});

export default async function (req: NextApiRequest, res: NextApiResponse) {
  await NextCors(req, res, { methods: ["GET"], origin: "*" });

  if (req.method !== "GET") {
    return res.status(405);
  }

  const data = schema.safeParse(req.query);

  if (!data.success) {
    return res.status(404).json({ message: "Not found" });
  }

  const flight = await FlightModel.findByPk(data.data.id);
  if (flight === null) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(flight);
}
