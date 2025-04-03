import React, { ReactElement } from "react";
import { notFound } from "next/navigation";

import { cars } from "@/db/cars";
import { CommentModel } from "@/models/comment.model";

import styles from "./page.module.css";

import CarInfo from "./components/car-info/car-info.component";
import PriceCar from "./components/price-car/price-car.component";
import LocationCar from "./components/location-car/location-car.component";
import Features from "./components/features/features.component";
import DriverPriceCar from "./components/price-car-with-driver/price-car-with-driver.component";
import SpecsAndFeatures from "./components/car-details/car-details.component";
import Peugeot206RentalInfo from "./components/Rental-Info/Peugeot206RentalInfo";
import CommentComponent from "./components/comment/comment.component";

type Props = {
  params: { id: string };
};
const comments: CommentModel[] = [
  {
    id: "1",
    user: {
      id: "101",
      username: "traveler123",
      name: "محمد رضایی",
    },
    date: new Date(Date.now() - 2 * 24 * 3600 * 1000),
    rating: 5,
    text: "خودروی پراید تحویل گرفتیم، بسیار تمیز و با شرایط عالی بود. روند تحویل فقط ۱۰ دقیقه طول کشید. ممنون از خدمات خوبتون!",
  },
  {
    id: "2",
    user: {
      id: "102",
      username: "roadtrip_lover",
      name: "فاطمه محمدی",
    },
    date: new Date(Date.now() - 5 * 24 * 3600 * 1000),
    rating: 4,
    text: "تجربه خوبی بود، فقط باک بنزین خودرو کاملا پر نبود که مجبور شدیم اول بریم پمپ بنزین. به غیر از این مورد همه چیز عالی بود.",
  },
  {
    id: "3",
    user: {
      id: "103",
      username: "business_trips",
      name: "علی نوروزی",
    },
    date: new Date(Date.now() - 8 * 24 * 3600 * 1000),
    rating: 5,
    text: "برای سفر کاری تبریز از این سامانه استفاده کردم. خودروی دنا با کمترین قیمت بازار اجاره دادند. واقعا راضی بودم.",
  },
  {
    id: "4",
    user: {
      id: "104",
      username: "family_trips",
      name: "زهرا حسینی",
    },
    date: new Date(Date.now() - 10 * 24 * 3600 * 1000),
    rating: 3,
    text: "صندلی کودک که درخواست داده بودیم فراموش شده بود، اما پشتیبانی خیلی سریع مشکل رو حل کردن. خودروی تیبا شرایط مطلوبی داشت.",
  },
  {
    id: "5",
    user: {
      id: "105",
      username: "first_renter",
      name: "رضا کریمی",
    },
    date: new Date(Date.now() - 12 * 24 * 3600 * 1000),
    rating: 5,
    text: "اولین بار بود از این سامانه استفاده می‌کردم. همه مراحل به سادگی انجام شد و خودروی سمند عالی بود. حتما دوباره استفاده می‌کنم.",
  },
  {
    id: "6",
    user: {
      id: "106",
      username: "weekend_driver",
      name: "نرگس امینی",
    },
    date: new Date(Date.now() - 15 * 24 * 3600 * 1000),
    rating: 4,
    text: "برای سفر آخر هفته به شمال خودروی کیا ریو اجاره کردیم. فقط یک خراش کوچک روی سپر داشت که در قرارداد ذکر شده بود. پیشنهاد می‌کنم.",
  },
  {
    id: "7",
    user: {
      id: "107",
      username: "car_enthusiast",
      name: "امیرحسین فلاحی",
    },
    date: new Date(Date.now() - 18 * 24 * 3600 * 1000),
    rating: 5,
    text: "به عنوان کسی که همیشه نگران شرایط فنی خودروهاست باید بگم این خودروی مزدا ۳ عالی بود. کلیمومتر دقیق و موتور سالمی داشت.",
  },
  {
    id: "8",
    user: {
      id: "108",
      username: "snow_trip",
      name: "مریم اکبری",
    },
    date: new Date(Date.now() - 20 * 24 * 3600 * 1000),
    rating: 5,
    text: "برای سفر به پیست اسکی شمشک خودروی چهارچرخ محرک اجاره کردیم. واقعا در برف عالی عمل کرد و نگرانی از بابت ایمنی نداشتیم.",
  },
  {
    id: "9",
    user: {
      id: "109",
      username: "long_rental",
      name: "پویا تقوی",
    },
    date: new Date(Date.now() - 25 * 24 * 3600 * 1000),
    rating: 4,
    text: "به مدت یک ماه خودروی ۲۰۶ اجاره کردم. فقط یک بار مشکل استارت داشت که پشتیبانی فورا خودروی جایگزین فرستادند. خدمات پس از فروش عالی بود.",
  },
  {
    id: "10",
    user: {
      id: "110",
      username: "new_driver",
      name: "سارا موسوی",
    },
    date: new Date(Date.now() - 30 * 24 * 3600 * 1000),
    rating: 5,
    text: "به عنوان راننده مبتدی، خودروی اتوماتیک میتسوبیشی لنسر تحویل گرفتم که واقعا رانندگی با آن ساده بود. ممنون از راهنمایی‌های کارکنان هنگام تحویل.",
  },
  {
    id: "11",
    user: {
      id: "111",
      username: "family_of_four",
      name: "حمیدرضا کاظمی",
    },
    date: new Date(Date.now() - 35 * 24 * 3600 * 1000),
    rating: 3,
    text: "خودروی سایپا سیتروئین برای خانواده ۴ نفره ما کمی کوچک بود. بهتر بود در مشخصات خودرو ظرفیت را دقیقتر ذکر می‌کردند.",
  },
  {
    id: "12",
    user: {
      id: "112",
      username: "luxury_lover",
      name: "ترانه یوسفی",
    },
    date: new Date(Date.now() - 40 * 24 * 3600 * 1000),
    rating: 5,
    text: "برای مراسم عروسی برادرمان BMW سری ۵ اجاره کردیم. خودرویی با شرایط عالی، تمیز و کاملا لوکس بود. ارزش پولی که پرداخت کردیم را داشت.",
  },
  {
    id: "13",
    user: {
      id: "113",
      username: "van_renter",
      name: "مهدی صالحی",
    },
    date: new Date(Date.now() - 45 * 24 * 3600 * 1000),
    rating: 4,
    text: "برای انتقال وسایل منزل به وانت نیسان نیاز داشتیم. تحویل به موقع و خودرویی با ظرفیت مناسب تحویل گرفتیم. فقط کمی دیرتر از موعد رسید.",
  },
  {
    id: "14",
    user: {
      id: "114",
      username: "eco_friendly",
      name: "هستی مرادی",
    },
    date: new Date(Date.now() - 50 * 24 * 3600 * 1000),
    rating: 5,
    text: "خوشحالم که گزینه خودروی هیبریدی (تویوتا پریوس) هم در لیست خودروها وجود دارد. هم مصرف سوخت پایینی داشت هم آلایندگی کمتری ایجاد می‌کرد.",
  },
  {
    id: "15",
    user: {
      id: "115",
      username: "last_minute",
      name: "امید جهانگیری",
    },
    date: new Date(Date.now() - 55 * 24 * 3600 * 1000),
    rating: 4,
    text: "ساعت ۱۰ شب برای فردا صبح به خودرو نیاز داشتیم. با وجود اینکه انتظار نداشتیم، خودرویی با شرایط مناسب برایمان پیدا کردند. ممنون از پیگیری سریع.",
  },
];
export default function Page({ params }: Props): ReactElement {
  const car = cars.find((x) => x.id === params.id);

  if (!car) {
    return notFound();
  }

  return (
    <div className={styles.page}>
      <div className={styles.carInfo}>
        <CarInfo car={car} />
      </div>

      <div className={styles.Prices}>
        <PriceCar car={car} />
        <DriverPriceCar car={car} />
      </div>

      <div className={styles.locationCar}>
        <LocationCar car={car} />
        <Features features={car.features} />
        {comments.map((comment) => (
          <CommentComponent key={comment.id} comment={comment} />
        ))}
      </div>

      <div className={styles.SpecsAndFeatures}>
        <SpecsAndFeatures car={car} />
        <div className={styles.rentalInfo}>
          <Peugeot206RentalInfo car={car} />
        </div>
      </div>
    </div>
  );
}
