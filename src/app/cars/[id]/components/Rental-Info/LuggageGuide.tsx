import React from "react";

import styles from "./Peugeot206RentalInfo.module.css";

const LuggageGuide = ({ luggage }) => {
  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>راهنمای چمدان</h2>
      <div className={styles.infoCard}>
        <p>
          ظرفیت صندوق عقب این مدل حدود ۲۳۰ لیتر است. این مقدار فضا به اندازه‌ای
          است که می‌توانید در آن {luggage.toLocaleString("fa-IR")} چمدان متوسط
          (چمدان‌های معمولی که معمولاً در سفرهای کوتاه‌مدت استفاده می‌شود) جا
          بدهید. اگر چمدان‌ها بزرگتر باشند، ممکن است تنها{" "}
          {(parseInt(luggage) - 1).toLocaleString("fa-IR")} چمدان بزرگ جا بگیرد.
        </p>
      </div>
    </section>
  );
};

export default LuggageGuide;
