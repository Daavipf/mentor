import { Pool } from "pg";

const pgConnectionSingleton = globalThis as unknown as {
  pgPool: Pool | undefined;
};

export const pool =
  pgConnectionSingleton.pgPool ??
  new Pool({
    connectionString: process.env.POSTGRES_URL,
  });

if (process.env.NODE_ENV !== "production") {
  pgConnectionSingleton.pgPool = pool;
}
