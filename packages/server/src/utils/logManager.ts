import * as pino from "pino";

export const logManager = () => {
  const loggingInstance = pino(
    { prettyPrint: { colorize: true } },
    process.stdout
  );

  process.on("uncaughtException", err => {
    const finalLogger = pino.final(loggingInstance);
    finalLogger.error(err, "Uncaught Exception");
    process.exit(1);
  });
  process.on("unhandledRejection", err => {
    const finalLogger = pino.final(loggingInstance);
    finalLogger.error(err, "Uncaught Rejection");
    process.exit(1);
  });
  const lNow = new Date().toLocaleString();
  loggingInstance.info(`Logging initialized at ${lNow}`);

  return loggingInstance;
};
