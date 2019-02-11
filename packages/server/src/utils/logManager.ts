import * as pino from "pino";

export const logManager = () => {
  const loggingInstance = pino(
    { prettyPrint: { colorize: true } },
    process.stdout
  );

  // write first log entry...
  const lNow = new Date().toLocaleString();
  loggingInstance.info(
    `Logging to ${process.env.RUNTIME_LOG_FILE} initialized at ${lNow}`
  );

  return loggingInstance;
};

/* 
    // would like to be able to log both to stdout and to RUNTIME_LOG_FILE
    // but couldn't figure out how to get that to work. 
    const logFile = fs.createWriteStream(process.env.RUNTIME_LOG_FILE!, {
        flags: "a",
        autoClose: true,
    });
*/
