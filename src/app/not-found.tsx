import { ReactElement } from "react";
import Image from "next/image";
import notFoundImage from "@/assets/illustrations/404.png";
import GlobalSearchBoxComponent from "@/components/globall-search-box/globall-search-box.component";

export default function NotFound(): ReactElement {
  return (
    <div className="grid grid-areas-[writings_visuals;search_search] place-content-center gap-6 min-h-full">
      <div className="[grid-area:writings]">
        <div className="text-[var(--fz-800)] font-light leading-[0.8]">
          404
        </div>
        <h1 className="mb-8 text-[var(--fz-600)]">صفحه‌ی مورد نظر پیدا نشد!</h1>
        <p className="max-w-[50ch]">
          با عرض پوزش، صفحه مورد نظر شما در{" "}
          <span className="text-[var(--fz-500)] m-1 text-[var(--color-primary)]">
            کا‌‌‌‌رِمون
          </span>{" "}
          پیدا نشد، لطفاً ماشین یا ویژگی مورد نظر خود را جستجو کنید.
        </p>
      </div>

      <div className="[grid-area:visuals] flex justify-center items-center">
        <Image
          src={notFoundImage}
          alt="Not Found"
          width={300}
          className="h-full max-w-[80%] max-h-[250px]"
        />
      </div>

      <div className="[grid-area:search]">
        <GlobalSearchBoxComponent />
      </div>
    </div>
  );
}
