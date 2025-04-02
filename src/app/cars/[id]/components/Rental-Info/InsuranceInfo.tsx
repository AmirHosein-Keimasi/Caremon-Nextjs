import React from "react";
import styles from "./Peugeot206RentalInfo.module.css";

const InsuranceInfo = ({ carName }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        بیمه اجاره&nbsp;
        {carName}
        &nbsp; در تهران
      </h2>

      <div className={styles.insuranceGrid}>
        <div className={`${styles.insuranceCard} ${styles.basic}`}>
          <h3 className={styles.insuranceTitle}>بیمه پایه</h3>
          <p>
            بیمه پایه حداقل پوشش مالی و تعهد مالی را فراهم می‌کند. مسئولیت مالی
            برای همه‌ی خسارت‌ها و آسیب‌ها به عهده اجاره‌کننده خواهد بود.
          </p>
        </div>

        <div className={`${styles.insuranceCard} ${styles.medium}`}>
          <h3 className={styles.insuranceTitle}>بیمه متوسط</h3>
          <ul className={styles.insuranceList}>
            <li>امداد جاده ای گسترده (ERA)</li>
            <li>تعهد ایمنی سعادت رنت (SSP)</li>
            <li>پوشش کامل سرقت</li>
            <li>بیمه شخص ثالث (ALI)</li>
            <li>پوشش بیمه سرنشینان خودرو</li>
            <li>حق توقف خودرو (CCI)</li>
          </ul>
          <div className={styles.priceTag}>۲۵۰,۰۰۰ تومان روزانه</div>
        </div>

        <div className={`${styles.insuranceCard} ${styles.full}`}>
          <h3 className={styles.insuranceTitle}>بیمه کامل</h3>
          <ul className={styles.insuranceList}>
            <li>امداد جاده‌ای گسترده (ERA)</li>
            <li>تعهد ایمنی سعادت رنت (SSP)</li>
            <li>پوشش کامل سرقت</li>
            <li>بیمه شخص ثالث (ALI)</li>
            <li>حداقل معافیت افت قیمت</li>
            <li>بیمه بدنه و حداقل مسئولیت (LDW)</li>
          </ul>
          <div className={styles.priceTag}>۵۵۰,۰۰۰ تومان روزانه</div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceInfo;
