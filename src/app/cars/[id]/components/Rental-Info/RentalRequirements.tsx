import React from "react";
import styles from "./Peugeot206RentalInfo.module.css";

const RentalRequirements = () => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>مدارک لازم برای اجاره</h2>

      <div className={styles.gridContainer}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>ویژه افراد ساکن ایران</h3>
          <ul className={styles.list}>
            <li>کپی از گواهینامه رانندگی با اعتبار حداقل ۶ ماه</li>
            <li>کپی از کارت ملی</li>
            <li>مدرک احراز شغلی مانند فیش حقوقی</li>
            <li>سفته یا چک به ارزش خودرو</li>
            <li>پرداخت مبلغی به‌عنوان دیپوزیت</li>
          </ul>
        </div>

        <div className={styles.card}>
          <h3 className={styles.cardTitle}>مخصوص افراد ساکن خارج کشور</h3>
          <ul className={styles.list}>
            <li>ترجمه رسمی گواهینامه رانندگی</li>
            <li>کپی از پاسپورت</li>
            <li>دیپوزیت یا همان ودیعه ضمانت نقدی</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default RentalRequirements;
