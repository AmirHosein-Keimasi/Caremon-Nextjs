import Accordion from "@/components/Accordion/Accordion.component";
import { faqData, faqGuest } from "./data/faqData";

export default function page() {
  return (
    <main className="container">
      <h2 className="mt-4">سوالات متداول</h2>
      <Accordion items={faqData} />
      <h2 className="mt-4">مهمان (اجاره‌گیرنده)</h2>
      <Accordion items={faqGuest} />
    </main>
  );
}
