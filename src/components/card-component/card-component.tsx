import React, { PropsWithChildren, ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = PropsWithChildren;

export default function CardComponent({ children }: Props): ReactElement {
  return (
    <Card className="bg-[var(--color-surface-400)] shadow-[var(--shadow-400)]">
      <CardContent className="p-4 pt-4">{children}</CardContent>
    </Card>
  );
}
