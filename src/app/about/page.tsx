import { ReactElement } from "react";
import type { Metadata } from "next";
import {
  CheckCircle2,
  Users,
  Zap,
  Shield,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import ContactForm from "./components/contact-form.component";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

export const dynamic = "force-static";

const title = "درباره ما";
const description =
  "پلتفرم اجاره خودرو و رزرو آنلاین ماشین در ایران. با کارِمون خودروی مورد نظرتان را به‌راحتی اجاره کنید.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["درباره کارمون", "اجاره خودرو", "رزرو ماشین آنلاین", "تماس با کارمون"],
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/about`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | کارِمون`,
    description,
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

export default function AboutPage(): ReactElement {
  return (
    <div className="w-full min-w-0 max-w-full px-4 lg:max-w-3xl lg:px-6 lg:mx-auto">
      {/* Hero */}
      <section className="py-6 text-center lg:py-10">
        <div className="space-y-2 lg:space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-4xl">
            درباره <span className="text-primary">کارِمون</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed lg:text-lg">
            پلتفرم پیشرو اجاره خودرو آنلاین در ایران، متعهد به تجربه‌ای آسان،
            امن و قابل اعتماد
          </p>
        </div>
      </section>

      {/* Stats: 2 cols mobile, 4 cols desktop */}
      <section className="py-4 lg:py-8">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {[
            { num: "+۵۰۰۰", label: "خودرو فعال" },
            { num: "۲۸", label: "شهر پوشش‌شده" },
            { num: "+۱۰۰K", label: "کاربر فعال" },
            { num: "۲۴/۷", label: "پشتیبانی" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="p-3 rounded-xl border border-border text-center flex flex-col items-center justify-center min-h-[76px] lg:p-4 lg:min-h-[92px]"
            >
              <span className="text-lg font-bold text-primary lg:text-2xl">{num}</span>
              <span className="text-[10px] text-muted-foreground mt-0.5 lg:text-xs lg:mt-1">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Mission */}
      <section className="py-6 lg:py-10">
        <h2 className="text-lg font-bold mb-3 text-primary lg:text-2xl lg:mb-4">
          ماموریت ما
        </h2>
        <div className="space-y-3 lg:space-y-4">
          <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">
            کارِمون به عنوان یک پل ارتباطی میان میزبانان و سفرچیان، فرآیند
            اجاره خودرو را ساده‌تر و ایمن‌تر کرده است. ما بر این باور
            هستیم که هر کسی باید بتواند به بسادگی و با اطمینان خودروی مورد
            نیازش را اجاره کند.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed lg:text-base">
            با استفاده از فناوری مدرن و تیم متخصصی، ما تجربه‌ای بی‌نقص ایجاد
            کرده‌ایم که هزاران مشتری راضی از آن استفاده می‌کنند.
          </p>
        </div>
      </section>

      {/* Why Choose Us: 1 col mobile, 2 cols desktop */}
      <section className="py-6 lg:py-10">
        <div className="space-y-4 lg:space-y-6">
          <div className="text-center space-y-1 lg:space-y-2">
            <h2 className="text-lg font-bold text-primary lg:text-2xl">
              چرا کارِمون را انتخاب کنید؟
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto lg:text-base">
              ما تمام چیزی را برای تجربه‌ای بهتر فراهم کرده‌ایم
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2 lg:gap-5">
            {[
              { Icon: Zap, title: "جستجوی سریع و هوشمند", desc: "فیلترهای پیشرفته و جستجوی ساده‌شده برای یافتن خودروی مناسب در کمترین زمان" },
              { Icon: Shield, title: "امنیت و اعتماد", desc: "تمامی خودروها بیمه‌شده و تحت پوشش بیمه‌نامه مشخصی قرار دارند" },
              { Icon: Users, title: "مقایسه خودروها", desc: "مقایسه آسان خودروهای مختلف برای انتخاب بهترین گزینه" },
              { Icon: CheckCircle2, title: "قیمت‌گذاری شفاف", desc: "بدون هزینه پنهان، تمام هزینه‌ها از قبل مشخص است" },
              { Icon: Zap, title: "رزرو آنلاین", desc: "کل فرآیند رزرو از جستجو تا پرداخت به صورت آنلاین انجام می‌شود" },
              { Icon: Shield, title: "پشتیبانی ۲۴ ساعته", desc: "تیم پشتیبانی ما همیشه آماده کمک به شما در هر ساعتی است" },
            ].map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="p-3 border border-border rounded-xl flex flex-col gap-2 min-h-0 lg:p-4 lg:gap-2.5"
              >
                <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 lg:w-10 lg:h-10">
                  <Icon className="w-4 h-4 text-primary lg:w-5 lg:h-5" />
                </div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">{title}</h3>
                <p className="text-muted-foreground text-xs leading-relaxed lg:text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-6 lg:py-10">
        <div className="space-y-4 lg:space-y-6">
          <div className="text-center space-y-1 lg:space-y-2">
            <h2 className="text-lg font-bold text-primary lg:text-2xl">تماس با ما</h2>
            <p className="text-muted-foreground text-sm lg:text-base">
              با سؤالات و پیشنهادات خود با ما در تماس باشید
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 mb-4 lg:grid-cols-3 lg:gap-4 lg:mb-6">
            <div className="p-3 rounded-lg border border-border space-y-1.5 lg:p-4 lg:space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 lg:w-9 lg:h-9">
                  <MapPin className="w-3.5 h-3.5 text-primary lg:w-4 lg:h-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">آدرس</h3>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed lg:text-sm">
                تهران، خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳
              </p>
            </div>
            <div className="p-3 rounded-lg border border-border space-y-1.5 lg:p-4 lg:space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 lg:w-9 lg:h-9">
                  <Phone className="w-3.5 h-3.5 text-primary lg:w-4 lg:h-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">تلفن</h3>
              </div>
              <a href="tel:02112345678" className="text-xs text-primary hover:underline lg:text-sm">
                ۰۲۱-۱۲۳۴۵۶۷۸
              </a>
            </div>
            <div className="p-3 rounded-lg border border-border space-y-1.5 lg:p-4 lg:space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 lg:w-9 lg:h-9">
                  <Mail className="w-3.5 h-3.5 text-primary lg:w-4 lg:h-4" />
                </div>
                <h3 className="font-semibold text-foreground text-sm lg:text-base">ایمیل</h3>
              </div>
              <a href="mailto:info@caremon.ir" className="text-xs text-primary hover:underline lg:text-sm">
                info@caremon.ir
              </a>
            </div>
          </div>
          <div className="max-w-xl mx-auto">
            <div className="p-4 rounded-lg border border-border lg:p-5">
              <h3 className="text-sm font-semibold mb-3 text-foreground lg:text-base lg:mb-4">
                ارسال پیام
              </h3>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
