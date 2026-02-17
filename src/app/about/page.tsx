import { ReactElement } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "./components/contact-form.component";

export const metadata = {
  title: "درباره ما | کارِمون",
  description:
    "پلتفرم اجاره خودرو و رزرو آنلاین ماشین در ایران. با کارِمون خودروی مورد نظرتان را به‌راحتی اجاره کنید.",
};

export default function AboutPage(): ReactElement {
  return (
    <div className="container py-12 max-w-4xl">
      <section className="mb-16">
        <h1 className="text-3xl font-bold mb-6">درباره کارِمون</h1>
        <div className="prose prose-foreground max-w-none space-y-4 text-foreground leading-relaxed">
          <p>
            کارِمون پلتفرمی یکپارچه برای اجاره خودرو و رزرو آنلاین ماشین در سراسر
            ایران است. ما با هدف ساده‌سازی فرآیند اجاره خودرو و ارائه تجربه‌ای
            مطمئن و راحت به شما، این سرویس را راه‌اندازی کرده‌ایم.
          </p>
          <p>
            با استفاده از کارِمون می‌توانید در کمترین زمان، خودروی مناسب خود را
            پیدا کرده و به‌صورت آنلاین رزرو کنید. تنوع خودروها، قیمت‌های شفاف و
            پشتیبانی ۲۴ ساعته از جمله مزایای استفاده از خدمات ماست.
          </p>
          <h2 className="text-xl font-semibold mt-8 mb-4">چرا کارِمون؟</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>جستجوی آسان و فیلترهای پیشرفته</li>
            <li>مقایسه خودروها قبل از رزرو</li>
            <li>قیمت‌گذاری شفاف و بدون هزینه پنهان</li>
            <li>پشتیبانی اختصاصی برای سفرهای شما</li>
          </ul>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">تماس با ما</h2>
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <div className="flex gap-3 p-4 rounded-lg bg-muted/50">
            <MapPin className="size-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold mb-1">آدرس</h3>
              <p className="text-sm text-muted-foreground">
                تهران، خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳
              </p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-lg bg-muted/50">
            <Phone className="size-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold mb-1">تلفن</h3>
              <p className="text-sm text-muted-foreground">۰۲۱-۱۲۳۴۵۶۷۸</p>
            </div>
          </div>
          <div className="flex gap-3 p-4 rounded-lg bg-muted/50 md:col-span-2">
            <Mail className="size-5 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold mb-1">ایمیل</h3>
              <p className="text-sm text-muted-foreground">
                info@caremon.ir
              </p>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">ارسال پیام</h3>
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
