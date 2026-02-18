import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "نمایش کامپوننت‌ها",
  description: "نمایش کامپوننت‌های UI پروژه.",
  robots: { index: false, follow: false },
};

export default function ComponentsShowcaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
