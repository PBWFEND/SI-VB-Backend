export const logger = {
  info: (msg: string, meta?: any) => {
    console.log(JSON.stringify({ level: "INFO", timestamp: new Date().toISOString(), message: msg, ...meta }));
  },
  error: (msg: string, meta?: any) => {
    const sanitizedMeta = { ...meta };
    if (sanitizedMeta.body && sanitizedMeta.body.password) {
      sanitizedMeta.body.password = "***REDACTED***";
    }
    console.error(JSON.stringify({ level: "ERROR", timestamp: new Date().toISOString(), message: msg, ...sanitizedMeta }));
  },
};