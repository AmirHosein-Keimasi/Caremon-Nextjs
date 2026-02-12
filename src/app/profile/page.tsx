import type { ReactElement } from "react";

export default function ProfilePage(): ReactElement {
  return (
    <main style={{ padding: "2rem 1rem" }}>
      <h1 style={{ margin: 0 }}>پروفایل کاربر</h1>
      <p style={{ marginTop: "0.75rem" }}>
        اطلاعات پروفایل شما در این بخش نمایش داده می‌شود.
      </p>
    </main>
  );
}
