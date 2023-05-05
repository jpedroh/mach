import { FlightModel } from "@mach/database";
import { NextResponse } from "next/server";
import z from "zod";

const schema = z.object({
  id: z.string().uuid(),
});

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = schema.safeParse(params);

  if (!data.success) {
    return NextResponse.json(
      { message: "Not found" },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  const flight = await FlightModel.findByPk(data.data.id);
  if (flight === null) {
    return NextResponse.json(
      { message: "Not found" },
      {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  }

  return NextResponse.json(flight, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
