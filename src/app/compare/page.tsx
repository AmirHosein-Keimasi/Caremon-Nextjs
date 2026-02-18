import { ReactElement } from "react";
import { getCarsByIds } from "@/lib/cars";
import CompareTable from "./components/compare-table.component";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";

type Props = {
  searchParams: { ids?: string };
};

export default async function ComparePage({
  searchParams,
}: Props): Promise<ReactElement> {
  const idsParam = searchParams.ids;
  const ids = idsParam
    ? idsParam.split(",").map((id) => id.trim()).filter(Boolean)
    : [];
  const cars = await getCarsByIds(ids);

  return (
    <div className="w-full min-w-0 max-w-full px-4 py-6 lg:max-w-7xl lg:px-6 lg:py-8 lg:mx-auto">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "مقایسه خودروها" },
        ]}
        className="mb-4"
      />
      <h1 className="text-2xl font-bold mb-6">مقایسه خودروها</h1>
      {cars.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg mb-2">هنوز خودرویی برای مقایسه انتخاب نشده است.</p>
          <p className="text-sm">
            از صفحه جستجو یا صفحه هر خودرو، دکمه «مقایسه» را بزنید تا خودرو به لیست
            مقایسه اضافه شود.
          </p>
        </div>
      ) : (
        <CompareTable cars={cars} />
      )}
    </div>
  );
}
