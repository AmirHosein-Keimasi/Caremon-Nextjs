import React, { PropsWithChildren, ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = PropsWithChildren & { className?: string };

export default function CardComponent({
  children,
  className,
}: Props): ReactElement {
  return (
    <Card className={cn("bg-card shadow-md", className)}>
      <CardContent className="px-4 pt-3 pb-2">{children}</CardContent>
    </Card>
  );
}
