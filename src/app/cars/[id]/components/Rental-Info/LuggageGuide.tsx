import React, { PropsWithChildren } from "react";
import styles from "./RentalInfo.module.css";

type Props = PropsWithChildren & {
  luggage: number | string;
};

const LuggageGuide = ({ luggage }: Props) => {
  const luggageNumber =
    typeof luggage === "string" ? parseInt(luggage) : luggage;

  if (isNaN(luggageNumber) || luggageNumber <= 0) {
    return (
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>راهنمای چمدان</h2>
        <div className={styles.infoCard}>
          <p>ظرفیت صندوق عقب این مدل حدود ۲۳۰ لیتر است.</p>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>راهنمای چمدان</h2>
      <div className={styles.infoCard}>
        <p>
          ظرفیت صندوق عقب این مدل حدود ۲۳۰ لیتر است. این مقدار فضا به اندازه‌ای
          است که می‌توانید در آن {luggageNumber.toLocaleString("fa-IR")} چمدان
          متوسط (چمدان‌های معمولی که معمولاً در سفرهای کوتاه‌مدت استفاده می‌شود)
          جا بدهید. اگر چمدان‌ها بزرگتر باشند، ممکن است تنها{" "}
          {(luggageNumber - 1).toLocaleString("fa-IR")} چمدان بزرگ جا بگیرد.
        </p>
      </div>
    </section>
  );
};

export default LuggageGuide;
