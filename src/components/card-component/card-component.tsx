import React, { PropsWithChildren, ReactElement } from "react";

type Props = PropsWithChildren;

export default function CardComponent({ children }: Props): ReactElement {
  return (
    <div className="bg-[var(--color-surface-400)] shadow-[var(--shadow-400)] p-4 rounded-[var(--border-radius)]">
      {children}
    </div>
  );
}
