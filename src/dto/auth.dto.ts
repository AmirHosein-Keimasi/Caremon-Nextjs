import Prisma from "@prisma/client";

export type signupDto = Omit<Prisma.User, "id">;
export type signinDto = Pick<Prisma.User, "email" |"password">;
