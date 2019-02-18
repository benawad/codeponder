import * as pino from "pino";

export const logManager = () => {
  const loggingInstance = pino(
    { prettyPrint: { colorize: true } },
    process.stdout
  );

  // write first log entry...
  const lNow = new Date().toLocaleString();
  loggingInstance.info(
    `Logging initialized at ${lNow}`
  );

  return loggingInstance;
};
