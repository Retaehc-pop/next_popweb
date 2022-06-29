import { PrismaClient,Prisma } from "@prisma/client";

let prisma: PrismaClient

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export type fullProject = Prisma.ProjectGetPayload<{
  include: {
    categories: true;
    languages: true;
    images: true;
  }
}>

export default prisma;