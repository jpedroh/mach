import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import * as schema from "./schema";
import z from "zod";

const credentialsSchema = z
  .object({
    DATABASE_HOST: z.string(),
    DATABASE_USERNAME: z.string(),
    DATABASE_PASSWORD: z.string(),
  })
  .transform(({ DATABASE_HOST, DATABASE_PASSWORD, DATABASE_USERNAME }) => {
    return {
      host: DATABASE_HOST,
      username: DATABASE_USERNAME,
      password: DATABASE_PASSWORD,
    };
  });

const connection = connect(credentialsSchema.parse(process.env));

export const db = drizzle(connection, {
  schema,
  logger: true,
});
