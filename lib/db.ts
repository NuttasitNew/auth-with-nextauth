import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}
/* IT prismaClient call on Global Variable
 *
 * @type[{Global}]
 */
export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_EVN !== "production") globalThis.prisma = db;
