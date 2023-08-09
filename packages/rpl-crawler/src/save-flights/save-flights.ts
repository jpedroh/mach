import Flight from "@mach/common";
import { db, flights as flightsSchema } from "@mach/database";

function sliceArray(flights: Flight[]) {
  const response: Flight[][] = [];

  let i = 0;
  const step = 5000;

  for (; i < flights.length; i += step) {
    response.push(flights.slice(i, i + step));
  }

  if (i < flights.length) {
    response.push(flights.slice(i));
  }

  return response;
}

const makeSaveFlights = () => {
  return async (flights: Flight[]): Promise<void> => {
    await db.transaction(async (tx) => {
      await tx.delete(flightsSchema);
      const sliced = sliceArray(flights);
      for (const slice of sliced) {
        await tx.insert(flightsSchema).values(slice);
      }
    });
  };
};

export default makeSaveFlights;
