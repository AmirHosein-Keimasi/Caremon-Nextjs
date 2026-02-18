import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

import { cars } from "../src/db/cars";

const prisma = new PrismaClient();

const users = [
  {
    name: "امیرحسین کیماسی",
    username: "amir",
    email: "amirkimasi@gmail.com",
    password: "123456",
  },
  {
    name: "مریم احمدی",
    username: "maryam",
    email: "maryam.ahmadi@example.com",
    password: "123456",
  },
  {
    name: "علی رضایی",
    username: "ali_rezaei",
    email: "ali.rezaei@example.com",
    password: "123456",
  },
  {
    name: "سارا محمدی",
    username: "sara_m",
    email: "sara.mohammadi@example.com",
    password: "123456",
  },
  {
    name: "رضا کریمی",
    username: "reza_karimi",
    email: "reza.karimi@example.com",
    password: "123456",
  },
  {
    name: "زهرا حسینی",
    username: "zahra_h",
    email: "zahra.hosseini@example.com",
    password: "123456",
  },
];

function carToPrisma(car: (typeof cars)[number]) {
  return {
    id: car.id,
    name: car.name,
    model: car.model,
    img: car.img,
    location: car.location,
    reviewCount: car.reviewCount,
    ratingNumber: car.ratingNumber,
    withDriver: car.with_driver,
    rental: car.rental as object,
    capacity: car.capacity as object,
    features: car.features as object,
    engine: car.engine as object,
    driverRental: car.driver_rental as object,
  };
}

export async function main() {
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await prisma.user.create({
      data: {
        name: user.name,
        username: user.username,
        email: user.email,
        password: hashedPassword,
      },
    });
  }

  for (const car of cars) {
    await prisma.car.upsert({
      where: { id: car.id },
      create: carToPrisma(car),
      update: carToPrisma(car),
    });
  }
}

main().then(() => console.log("Done!"));
