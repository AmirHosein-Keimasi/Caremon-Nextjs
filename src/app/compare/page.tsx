import { ReactElement } from "react";
import { getCarsByIds } from "@/lib/cars";
import CompareTable from "./components/compare-table.component";

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
    <div className="container py-8">
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
