import React, { PropsWithChildren } from "react";
import styles from "./Peugeot206RentalInfo.module.css";
import { CarsModel } from "@/models/cars.model";

type Props = PropsWithChildren & {
  car: CarsModel;
};

const FAQ = ({ car }: Props) => {
  const faqItems = [
    {
      question: `هزینه اجاره ${car.name} در تهران چقدر است؟`,
      answer: `از ۳ تا ۱۴ روز: ${car.rental.days_3_to_14.toLocaleString("fa-IR")} تومان روزانه | بیشتر از ۱۴ روز: ${car.rental.more_than_14_days.toLocaleString("fa-IR")} تومان روزانه`,
    },
    {
      question: `چگونه می‌توانم ${car.name} را در تهران و شهرهای ایران اجاره کنم؟`,
      answer: `شما می‌توانید از طریق همین صفحه اجاره ${car.name}، به طور آنلاین اطلاعات موردنیاز را وارد کرده و سپس مدارک لازم را بارگذاری کنید تا خودروی مدنظرتان را برای کرایه رزرو کنید.`,
    },
    {
      question: `آیا امکان اجاره ${car.name} بدون راننده در فرودگاه وجود دارد؟`,
      answer: car.driver_rental?.airport_transfer
        ? `بله، در صورتی که بخواهید از ${car.name} بدون راننده به عنوان ترانسفر فرودگاهی استفاده کنید، می‌توانید با هزینه ${car.driver_rental.airport_transfer.toLocaleString("fa-IR")} تومان این سرویس را دریافت کنید.`
        : `خیر، این خودرو برای ترانسفر فرودگاهی بدون راننده در دسترس نیست.`,
    },
    {
      question: `منظور از دیپوزیت یا ودیعه ضمانت در اجاره ${car.name} چیست؟`,
      answer: `ودیعه ضمانت برای اجاره ${car.name} مبلغ ${car.rental.deposit.toLocaleString("fa-IR")} تومان است که پس از تحویل سالم خودرو به شما بازگردانده می‌شود.`,
    },
    {
      question: `آیا می‌توانم ${car.name} را در محل موردنظر خودم تحویل بگیرم؟`,
      answer: `بله، ${car.name} در محدوده ${car.location} در محل مورد نظر شما تحویل داده می‌شود.`,
    },
  ];

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>سؤالات متداول درباره {car.name}</h2>

      <div className={styles.faqContainer}>
        {faqItems.map((item, index) => (
          <div key={index} className={styles.faqItem}>
            <h3 className={styles.faqQuestion}>{item.question}</h3>
            <p className={styles.faqAnswer}>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
