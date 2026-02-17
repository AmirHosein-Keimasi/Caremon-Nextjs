import React, { PropsWithChildren } from "react";
type Props = PropsWithChildren & {
  carName: string;
};
const InsuranceInfo = ({ carName }: Props) => {
  return (
    <section className="mb-12">
      <h2 className="text-2xl text-foreground mb-6 pb-2 max-md:text-xl">
        بیمه اجاره&nbsp;
        {carName}
        &nbsp; در تهران
      </h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 max-md:grid-cols-1">
        <div className="p-6 rounded-lg shadow-md bg-card">
          <h3 className="text-xl mb-4">بیمه پایه</h3>
          <p>
            بیمه پایه حداقل پوشش مالی و تعهد مالی را فراهم می‌کند. مسئولیت مالی
            برای همه‌ی خسارت‌ها و آسیب‌ها به عهده اجاره‌کننده خواهد بود.
          </p>
        </div>

        <div className="p-6 rounded-lg shadow-md bg-primary-100 text-primary-900">
          <h3 className="text-xl mb-4">بیمه متوسط</h3>
          <ul className="list-disc pr-6 mb-6 leading-relaxed [&_li]:mb-2">
            <li>امداد جاده ای گسترده (ERA)</li>
            <li>تعهد ایمنی سعادت رنت (SSP)</li>
            <li>پوشش کامل سرقت</li>
            <li>بیمه شخص ثالث (ALI)</li>
            <li>پوشش بیمه سرنشینان خودرو</li>
            <li>حق توقف خودرو (CCI)</li>
          </ul>
          <div className="font-bold text-lg text-center py-2 bg-muted-foreground text-muted rounded-lg">
            ۲۵۰,۰۰۰ تومان روزانه
          </div>
        </div>

        <div className="p-6 rounded-lg shadow-md bg-primary text-primary-foreground">
          <h3 className="text-xl mb-4">بیمه کامل</h3>
          <ul className="list-disc pr-6 mb-6 leading-relaxed [&_li]:mb-2">
            <li>امداد جاده‌ای گسترده (ERA)</li>
            <li>تعهد ایمنی سعادت رنت (SSP)</li>
            <li>پوشش کامل سرقت</li>
            <li>بیمه شخص ثالث (ALI)</li>
            <li>حداقل معافیت افت قیمت</li>
            <li>بیمه بدنه و حداقل مسئولیت (LDW)</li>
          </ul>
          <div className="font-bold text-lg text-center py-2 bg-muted-foreground text-muted rounded-lg">
            ۵۵۰,۰۰۰ تومان روزانه
          </div>
        </div>
      </div>
    </section>
  );
};

export default InsuranceInfo;
