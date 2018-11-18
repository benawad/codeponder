import * as Redis from "ioredis";

export const redis =
  process.env.NODE_ENV === "production"
    ? new Redis("redis://redis:6379")
    : new Redis();
