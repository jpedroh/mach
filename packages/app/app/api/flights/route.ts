import { FlightModel } from "@mach/database";
import { NextResponse } from "next/server";
import { Op } from "sequelize";
import z from "zod";

export const dynamic = "force-dynamic";

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

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const data = schema.safeParse(Object.fromEntries(searchParams.entries()));

    if (!data.success) {
      return NextResponse.json(
        { message: "Bad Request" },
        {
          status: 400,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          },
        }
      );
    }

    const { limit, offset, ...where } = data.data;

    const { count, rows: items } = await FlightModel.findAndCountAll({
      where,
      limit,
      offset,
      order: ["id"],
    });

    return NextResponse.json(
      { count, items },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      {
        status: 500,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }
}
