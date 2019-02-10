import * as pino from "pino";
import * as fs from "fs";

export const logManager = (logFileName: fs.PathLike) => {
  const logFile = fs.createWriteStream(logFileName);
  const loggingInstance = pino(logFile);

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
