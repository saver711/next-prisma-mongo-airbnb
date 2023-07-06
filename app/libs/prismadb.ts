// 👁️  This code ensures that we only have one instance of the Prisma Client in our application, by using the global object to create a global variable prisma. The prisma variable is either set to the existing global.prisma instance, or it creates a new instance if it doesn’t exist yet. 


import { PrismaClient } from "@prisma/client"
declare global {
  var prisma: PrismaClient | undefined
}

const prismadb = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb

export {  prismadb }

