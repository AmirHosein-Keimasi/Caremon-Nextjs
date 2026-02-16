import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & {
  luggage: number | string;
};

const LuggageGuide = ({ luggage }: Props) => {
  const luggageNumber =
    typeof luggage === "string" ? parseInt(luggage) : luggage;

  if (isNaN(luggageNumber) || luggageNumber <= 0) {
    return (
      <section className="mb-12">
        <h2 className="text-2xl text-[var(--color-text-700)] mb-6 pb-2 max-md:text-xl">
          راهنمای چمدان
        </h2>
        <div className="bg-[var(--color-surface-400)] p-6 rounded-[var(--border-radius)] shadow-[var(--shadow-400)] leading-relaxed">
          <p>ظرفیت صندوق عقب این مدل حدود ۲۳۰ لیتر است.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl text-[var(--color-text-700)] mb-6 pb-2 max-md:text-xl">
        راهنمای چمدان
      </h2>
      <div className="bg-[var(--color-surface-400)] p-6 rounded-[var(--border-radius)] shadow-[var(--shadow-400)] leading-relaxed">
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
