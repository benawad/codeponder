import * as pino from "pino";

export const logManager = (): pino.Logger => {
  const loggingInstance = pino(
    { prettyPrint: { colorize: true } },
    process.stdout
  );

  // write first log entry...
  const lNow = new Date().toLocaleString();
  loggingInstance.info(`Logging initialized at ${lNow}`);

  return loggingInstance;
};
