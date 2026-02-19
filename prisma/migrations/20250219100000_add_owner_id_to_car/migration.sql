-- AlterTable: اضافه کردن ستون owner_id به جدول Car (برای مارکت‌پلیس / خودروهای کاربران)
ALTER TABLE "Car" ADD COLUMN IF NOT EXISTS "owner_id" TEXT;

-- AddForeignKey
ALTER TABLE "Car" DROP CONSTRAINT IF EXISTS "Car_owner_id_fkey";
ALTER TABLE "Car" ADD CONSTRAINT "Car_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AlterTable: اضافه کردن ستون renter_id به جدول Reservation (در صورت نبود)
ALTER TABLE "Reservation" ADD COLUMN IF NOT EXISTS "renter_id" TEXT;

-- AddForeignKey
ALTER TABLE "Reservation" DROP CONSTRAINT IF EXISTS "Reservation_renter_id_fkey";
ALTER TABLE "Reservation" ADD CONSTRAINT "Reservation_renter_id_fkey" FOREIGN KEY ("renter_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
