"use client";

import { ReactElement } from "react";

import { Button } from "@/components/ui/button";
import { useCompareStore } from "@/store/compareStore";

import { GitCompare, Check } from "lucide-react";

type Props = {
  carId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
};

export default function CompareButtonComponent({
  carId,
  variant = "outline",
  size = "sm",
  className,
}: Props): ReactElement {
  const { addCar, removeCar, isInCompare, carIds } = useCompareStore();
  const inCompare = isInCompare(carId);
  const isFull = carIds.length >= 5 && !inCompare;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inCompare) {
      removeCar(carId);
    } else if (!isFull) {
      addCar(carId);
    }
  };

  return (
    <Button
      type="button"
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
      disabled={isFull}
      title={
        inCompare
          ? "حذف از مقایسه"
          : isFull
            ? "حداکثر ۵ خودرو قابل مقایسه است"
            : "افزودن به مقایسه"
      }
    >
      {inCompare ? (
        <>
          <Check className="size-4" />
          در مقایسه
        </>
      ) : (
        <>
          <GitCompare className="size-4" />
          مقایسه
        </>
      )}
    </Button>
  );
}
