import React from "react";

const RentalRequirements = () => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl text-[var(--color-text-700)] mb-6 pb-2 max-md:text-xl">
        مدارک لازم برای اجاره
      </h2>

      <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1">
        <div className="bg-[var(--color-surface-400)] p-6 rounded-[var(--border-radius)] shadow-[var(--shadow-400)]">
          <h3 className="text-xl text-[var(--color-primary)] mb-4">
            ویژه افراد ساکن ایران
          </h3>
          <ul className="list-disc pr-6 leading-relaxed [&_li]:mb-2">
            <li>کپی از گواهینامه رانندگی با اعتبار حداقل ۶ ماه</li>
            <li>کپی از کارت ملی</li>
            <li>مدرک احراز شغلی مانند فیش حقوقی</li>
            <li>سفته یا چک به ارزش خودرو</li>
            <li>پرداخت مبلغی به‌عنوان دیپوزیت</li>
          </ul>
        </div>

        <div className="bg-[var(--color-surface-400)] p-6 rounded-[var(--border-radius)] shadow-[var(--shadow-400)]">
          <h3 className="text-xl text-[var(--color-primary)] mb-4">
            مخصوص افراد ساکن خارج کشور
          </h3>
          <ul className="list-disc pr-6 leading-relaxed [&_li]:mb-2">
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
