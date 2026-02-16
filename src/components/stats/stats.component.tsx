import React, { ReactElement } from "react";

export default function StatsComponents(): ReactElement {
  return (
    <ul className="flex gap-12 w-[min(75rem,100%-2rem)] justify-center list-none">
      <li>
        <div className="bg-gradient-to-r from-[var(--color-primary)] from-[1%] to-[var(--color-primary-darkeMod)] bg-clip-text text-transparent text-[var(--fz-500)] font-extrabold leading-none">
          + 500
        </div>
        <div className="text-[var(--fz-200)] font-semibold leading-[3] flex justify-center">
          مدل خودرو{" "}
        </div>
      </li>
      <div className="bg-[var(--color-gray-20)] h-12 w-0.5"></div>
      <li>
        <div className="bg-gradient-to-r from-[var(--color-primary)] from-[1%] to-[var(--color-primary-darkeMod)] bg-clip-text text-transparent text-[var(--fz-500)] font-extrabold leading-none">
          +7,000
        </div>
        <div className="text-[var(--fz-200)] font-semibold leading-[3] flex justify-center">
          تحویل موفق
        </div>
      </li>{" "}
      <div className="bg-[var(--color-gray-20)] h-12 w-0.5"></div>
      <li>
        <div className="bg-gradient-to-r from-[var(--color-primary)] from-[1%] to-[var(--color-primary-darkeMod)] bg-clip-text text-transparent text-[var(--fz-500)] font-extrabold leading-none">
          + 5
        </div>
        <div className="text-[var(--fz-200)] font-semibold leading-[3] flex justify-center">
          استان{" "}
        </div>
      </li>{" "}
    </ul>
  );
}
