import { createWriteStream, mkdirSync, WriteStream, existsSync } from "fs";
import { join } from "path";
import { config } from "dotenv";
config();
/**
 * ***Logger***
 *
 * `Logs to a file something.`
 *
 * ```js
 * Logger.log("Something cool")
 * ```
 */
class Logger {
  public prefix: string;
  public now: number;
  public systemLog: WriteStream;
  constructor(prefix: string) {
    this.prefix = prefix;
    this.now = Date.now();
    /**
     * Check if the `Logs` directory exists or not.
     */
    if (existsSync(join(__dirname, "./../Logs/")) === false)
      mkdirSync(join(__dirname, "./../Logs/"));

    /**
     * Creates the write-stream. Good for long-term writings... like our Logs!
     */
    this.systemLog = createWriteStream(
      join(__dirname, `./../Logs/${this.now}.log`)
    );
  }
  /**
   * log
   *
   * Logs to the file the specified argument.
   * @param log
   */
  public log(log: any) {
    if (process.env.LOGS === "true") {
      console.log(`[${this.prefix}] - ${Date.now()} - ${log}\r\n`);
      this.systemLog.write(`[${this.prefix}] - ${Date.now()} - ${log}\r\n`);
    }
  }
  public error(error, service: string) {
    process.env.LOGS === "true"
      ? this.systemLog.write(
          `[${
            this.prefix
          }] - ${Date.now()} - || ERROR IN SERVICE ${service} -> ${error} || \r\n`
        )
      : false;
  }

  public warn(log: any, service) {
    process.env.LOGS === "true"
      ? this.systemLog.write(
          `[${
            this.prefix
          }] - ${Date.now()} - || WARNING IN SERVICE ${service} -> ${log} || \r\n`
        )
      : false;
  }
}

export default new Logger(process.env.LOGS_PREFIX || "Default");
