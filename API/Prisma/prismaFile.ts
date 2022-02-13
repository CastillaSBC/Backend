import { PrismaClient } from "@prisma/client";
import Logger from "../Utilities/Log";

const prisma = new PrismaClient({
  log: [
    { level: "warn", emit: "event" },
    { level: "info", emit: "event" },
    { level: "error", emit: "event" },
  ],
  errorFormat: "pretty",
});

prisma.$on("warn", (e) => {
  Logger.warn(e, "Prisma Database Manager");
});

prisma.$on("info", (e) => {
  Logger.log(e);
});

prisma.$on("error", (e) => {
  Logger.error(e, "Prisma Database Manager");
});

export default prisma;
