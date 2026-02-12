-- CreateTable
CREATE TABLE "Car" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "img" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "review_count" INTEGER NOT NULL,
    "rating_number" DOUBLE PRECISION NOT NULL,
    "with_driver" TEXT NOT NULL,
    "rental" JSONB NOT NULL,
    "capacity" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "engine" JSONB NOT NULL,
    "driver_rental" JSONB NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL,
    "car_id" TEXT NOT NULL,
    "car_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reservation_pkey" PRIMARY KEY ("id")
);
