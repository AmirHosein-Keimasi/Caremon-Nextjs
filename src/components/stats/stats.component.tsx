import React, { ReactElement } from "react";

export default function StatsComponents(): ReactElement {
  return (
    <ul className="flex gap-12 w-[min(75rem,100%-2rem)] justify-center list-none">
      <li>
        <div className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent text-lg font-extrabold leading-none">
          + 500
        </div>
        <div className="text-xs font-semibold leading-[3] flex justify-center">
          مدل خودرو{" "}
        </div>
      </li>
      <div className="bg-border h-12 w-0.5"></div>
      <li>
        <div className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent text-lg font-extrabold leading-none">
          +7,000
        </div>
        <div className="text-xs font-semibold leading-[3] flex justify-center">
          تحویل موفق
        </div>
      </li>{" "}
      <div className="bg-border h-12 w-0.5"></div>
      <li>
        <div className="bg-gradient-to-r from-primary to-primary-600 bg-clip-text text-transparent text-lg font-extrabold leading-none">
          + 5
        </div>
        <div className="text-xs font-semibold leading-[3] flex justify-center">
          استان{" "}
        </div>
      </li>{" "}
    </ul>
  );
}
