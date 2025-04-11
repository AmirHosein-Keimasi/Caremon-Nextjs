import  Prisma  from "@prisma/client";

export type signupDto = Omit<Prisma.User,"id">
