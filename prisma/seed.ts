import { hashPassword } from "@/utils/bcrypt.utils";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const users: Prisma.UserCreateInput[] = [
  {
    name: "امیرحسین کیماسی ",
    username: "amir",
    email: "amirkimasi@gmail.com",
    password: "123456",
  },
];
export async function main() {
  for (const user of users) {
    const hashedPassword = await hashPassword(user.password);
    await prisma.user.create({ data: { ...user, password: hashedPassword } });
  }
}

main().then(() => console.log("Done!"));
