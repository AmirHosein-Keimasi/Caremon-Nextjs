"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export type BreadcrumbItemType = {
  label: string;
  href?: string;
};

type Props = {
  items: BreadcrumbItemType[];
  className?: string;
};

/**
 * ناوبری بردکرامپ برای تمام صفحات.
 * آخرین آیتم بدون href به‌عنوان صفحه فعلی نمایش داده می‌شود.
 */
export function BreadcrumbNav({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <Breadcrumb className={className}>
      <BreadcrumbList>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <BreadcrumbSeparator>
                  <ChevronLeft className="size-4" aria-hidden />
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem>
                {isLast || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
