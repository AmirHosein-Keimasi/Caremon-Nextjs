import { ReactElement, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

const CONTAINER_CLASS =
  "w-full min-w-0 max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8";

export default function LayoutContainer({
  children,
  className = "",
}: Props): ReactElement {
  return (
    <div className={`${CONTAINER_CLASS} ${className}`.trim()}>{children}</div>
  );
}
