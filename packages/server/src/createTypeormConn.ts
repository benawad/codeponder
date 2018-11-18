import { createConnection } from "typeorm";

const dev = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "codeponder",
  synchronize: true,
  logging: false,
  entities: ["src/entity/**/*.*"],
  migrations: ["src/migration/**/*.*"],
  subscribers: ["src/subscriber/**/*.*"],
  cli: {
    entitiesDir: "src/entity",
    migrationsDir: "src/migration",
    subscribersDir: "src/subscriber"
  }
};

const prod = {
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "codeponder",
  synchronize: false,
  logging: false,
  entities: ["src/entity/**/*.*"],
  migrations: ["src/migration/**/*.*"],
  subscribers: ["src/subscriber/**/*.*"]
};

export const createTypeormConn = async () => {
  let retries = 5;
  while (retries) {
    try {
      return createConnection(
        process.env.NODE_ENV === "production" ? (prod as any) : (dev as any)
      );
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      // wait 5 seconds
      await new Promise(res => setTimeout(res, 5000));
    }
  }

  return null;
};
