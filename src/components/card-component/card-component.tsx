import React, { PropsWithChildren, ReactElement } from "react";
import { Card, CardContent } from "@/components/ui/card";

type Props = PropsWithChildren;

export default function CardComponent({ children }: Props): ReactElement {
  return (
    <Card className="bg-card shadow-md">
      <CardContent className="p-4 pt-4">{children}</CardContent>
    </Card>
  );
}
