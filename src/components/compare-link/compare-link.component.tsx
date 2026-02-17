"use client";

import { ReactElement } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCompareStore } from "@/store/compareStore";

import { GitCompare } from "lucide-react";

export default function CompareLinkComponent(): ReactElement {
  const { carIds } = useCompareStore();
  const count = carIds.length;
  const href =
    count > 0 ? `/compare?ids=${encodeURIComponent(carIds.join(","))}` : "/compare";

  return (
    <Button variant="ghost" size="sm" asChild className="relative">
      <Link href={href}>
        <GitCompare className="size-4" />
        <span className="hidden sm:inline">مقایسه</span>
        {count > 0 && (
          <Badge
            variant="secondary"
            className="absolute -top-1 -end-1 size-5 p-0 flex items-center justify-center text-xs"
          >
            {count}
          </Badge>
        )}
      </Link>
    </Button>
  );
}
