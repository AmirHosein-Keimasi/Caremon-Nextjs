import { ReactElement } from "react";
import type { Metadata } from "next";
import { ScrollText } from "lucide-react";
import Accordion, { type AccordionSectionItem } from "@/components/Accordion/Accordion.component";
import { BreadcrumbNav } from "@/components/breadcrumb-nav/breadcrumb-nav";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

export const dynamic = "force-static";

const title = "قوانین و مقررات";
const description =
  "شرایط و قوانین اجاره خودرو در کارِمون. قوانین مارکت‌پلیس، میزبان و مهمان، تحویل و عودت، بیمه و مسئولیت‌ها.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["قوانین کارمون", "شرایط اجاره خودرو", "مقررات رزرو"],
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/Rules`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | کارِمون`,
    description,
  },
  alternates: {
    canonical: `${SITE_URL}/Rules`,
  },
};

const RULES_SECTIONS: AccordionSectionItem[] = [
    {
      value: "intro",
      title: "شرایط عمومی و مقدمات",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• کارِمون یک مارکت‌پلیس (بازارگاه) اجاره خودرو است؛ پل ارتباطی میان میزبان (هولدر / اجاره‌دهنده) و مهمان (اجاره‌گیرنده) خودرو</p>
          <p>• هر کاربر می‌تواند هم خودروی خود را برای اجاره ثبت کند (هولدر) و هم از خودروهای دیگران اجاره بگیرد</p>
          <p>• خودروهای پلتفرم بر اساس قوانین و مقررات کارِمون معاینه و بیمه شده‌اند؛ خودروهای ثبت‌شده توسط کاربران (مارکت‌پلیس) طبق شرایط اعلام‌شده توسط مالک و قوانین پلتفرم عرضه می‌شوند</p>
          <p>• هر خودرو دارای شناسه منحصر به فردی است که با آن می‌توان اطلاعات آن را رهگیری کرد</p>
        </div>
      ),
    },
    {
      value: "marketplace-holder",
      title: "مارکت‌پلیس و میزبان (هولدر)",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">ثبت خودرو برای اجاره</h4>
            <p className="text-muted-foreground leading-relaxed">
              کاربرانی که خودروی خود را در کارِمون برای اجاره قرار می‌دهند (هولدر) موظفند اطلاعات صحیح و کامل خودرو، قیمت، ودیعه و شرایط اجاره را وارد کنند. خودرو پس از ثبت در جستجو و لیست پلتفرم نمایش داده می‌شود.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">مسئولیت میزبان</h4>
            <p className="text-muted-foreground leading-relaxed">
              میزبان (هولدر) مسئول سلامت فنی و قانونی خودروی عرضه‌شده است. در صورت بروز اختلاف بین میزبان و مهمان، تیم پشتیبانی کارِمون بر اساس قوانین پلتفرم و مدارک طرفین داوری می‌کند.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">اجاره از مالک خصوصی</h4>
            <p className="text-muted-foreground leading-relaxed">
              خودروهایی که با برچسب «اجاره از مالک» یا «مالک خصوصی» نمایش داده می‌شوند توسط کاربران در مارکت‌پلیس ثبت شده‌اند. شرایط اجاره، تحویل و عودت طبق اعلام مالک و قوانین عمومی کارِمون است.
            </p>
          </div>
        </div>
      ),
    },
    {
      value: "rental-conditions",
      title: "قوانین و شرایط اجاره خودرو",
      content: (
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">۱. تحویل و بنزین</h4>
            <p className="text-muted-foreground leading-relaxed">
              تمامی خودروها با مقدار مشخصی بنزین تحویل می‌شوند. اجاره‌گیرنده موظف است خودرو را با همان میزان بنزین برگردانده یا مهلت‌ای برای پر کردن باک داشته باشد.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">۲. هزینه کارواش</h4>
            <p className="text-muted-foreground leading-relaxed">• خودرو‌های ایرانی: ۴۵۰ هزار تومان</p>
            <p className="text-muted-foreground leading-relaxed">• خودرو‌های خارجی: ۴۰۰ هزار تومان</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">۳. ممنوعیت دخانیات</h4>
            <p className="text-muted-foreground leading-relaxed">
              سیگار کشیدن داخل خودرو کاملاً ممنوع است. در صورت تخلف، هزینه کارواش اضافی از بیمه‌نامه کسر خواهد شد.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">۴. محدودیت کیلومتر</h4>
            <p className="text-muted-foreground leading-relaxed">• خودروهای اقتصادی: ۳۰۰ کیلومتر</p>
            <p className="text-muted-foreground leading-relaxed">• خودروهای شاسی‌بلند و خارجی: ۲۰۰ کیلومتر</p>
            <p className="text-muted-foreground leading-relaxed">• خودروهای لوکس: ۱۵۰ کیلومتر</p>
            <p className="text-muted-foreground leading-relaxed">• خودروهای سوپرلوکس: ۱۰۰ کیلومتر</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">۵. هزینه کیلومتر مازاد</h4>
            <p className="text-muted-foreground leading-relaxed">
              هرگونه کیلومتر زیادتر از حد مقرر، هزینه آن بر عهده اجاره‌گیرنده است.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold text-foreground">۶. تحویل خارج از ساعات اداری</h4>
            <p className="text-muted-foreground leading-relaxed">
              تحویل و عودت خودرو در خارج از ساعات اداری (۹ صبح تا ۶ بعدازظهر) شامل هزینه مازاد می‌شود.
            </p>
          </div>
        </div>
      ),
    },
    {
      value: "damages",
      title: "خسارات و مسئولیت‌های اجاره‌گیرنده",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• اجاره‌گیرنده مسئول هر گونه خسارتی است که ناشی از استفاده نامتعارف خودرو باشد</p>
          <p>• هزینه تصادف، خسارت ناشی از حادثه و افت قیمت خودرو بر عهده اجاره‌گیرنده است</p>
          <p>• هزینه محدود‌کردن خودرو در بازداشتگاه یا تعمیرگاه بر عهده اجاره‌گیرنده است</p>
          <p>• در صورت تصادف، خسارت توسط بیمه تأمین می‌شود؛ اما در صورت عدم پوشش کامل بیمه، مابقی خسارت از تضامین اجاره‌گیرنده کسر خواهد شد</p>
        </div>
      ),
    },
    {
      value: "delay",
      title: "شرایط تأخیر در عودت",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• به ازای هر دو ساعت تأخیر در عودت خودرو، هزینه یک روز اجاره باید پرداخت شود</p>
          <p>• در صورت تأخیر بیش از یک روز، به نسبت آن روز اضافی هزینه اجاره دریافت می‌شود</p>
        </div>
      ),
    },
    {
      value: "location",
      title: "محل تحویل و عودت",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• تحویل و عودت خودرو صرفاً در محل مشخص شرکت انجام می‌شود</p>
          <p>• در صورتی که اجاره‌گیرنده درخواست تحویل یا عودت خودرو در محل دیگری کند، هزینه ترانسفر توسط او پرداخت می‌شود</p>
          <p>• هماهنگی برای تحویل و عودت خودرو باید از طریق تماس تلفنی و یا پیامک انجام شود</p>
        </div>
      ),
    },
    {
      value: "final-settlement",
      title: "تسویه حساب و مسئولیت",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• پس از تسویه کامل حساب و دریافت رسید از طرف میزبان، تمامی مسئولیت‌های مادی و روحی بر عهده اجاره‌گیرنده خواهد بود</p>
          <p>• اگر هزینه‌ای متعلق به خودرو متوجه شود، کارِمون مجازی متصل نیست</p>
        </div>
      ),
    },
    {
      value: "forbidden",
      title: "موارد ممنوع برای خودروی اجاره‌ای",
      content: (
        <ol className="space-y-2 text-muted-foreground list-none p-0 m-0">
          <li className="flex gap-3"><span className="font-semibold text-foreground min-w-fit">۱.</span><span>استعمال دخانیات داخل خودرو</span></li>
          <li className="flex gap-3"><span className="font-semibold text-foreground min-w-fit">۲.</span><span>انتقال خودرو به شخص دیگری به هر عنوان (اجاره، امانت، صلح و غیره)</span></li>
          <li className="flex gap-3"><span className="font-semibold text-foreground min-w-fit">۳.</span><span>رانندگی در حالت مستی یا تحت تأثیر مواد مخدر</span></li>
          <li className="flex gap-3"><span className="font-semibold text-foreground min-w-fit">۴.</span><span>ارتکاب خلاف قانون با استفاده از خودرو (مانند حمل مواد مخدر، کشف حجاب، کلاهبرداری)</span></li>
          <li className="flex gap-3"><span className="font-semibold text-foreground min-w-fit">۵.</span><span>استفاده از خودرو برای مقاصد غیرقانونی</span></li>
          <li className="flex gap-3"><span className="font-semibold text-foreground min-w-fit">۶.</span><span>سوار کردن بیش از ظرفیت مجاز خودرو</span></li>
          <li className="flex gap-3"><span className="font-semibold text-foreground min-w-fit">۷.</span><span>رانندگی به سرعت‌های غیرقانونی یا خطرناک</span></li>
        </ol>
      ),
    },
    {
      value: "penalties",
      title: "مجازات‌های نقض قوانین",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• در صورت نقض قوانین و مقررات، کارِمون اختیار دارد که حساب کاربری شما را مسدود کند</p>
          <p>• مصادره بخشی یا کل تضامین در صورت تخلف از قوانین</p>
          <p>• جریمه نقدی اضافی برای تخلفات شدید</p>
          <p>• ممکن است مورد شکایت قانونی قرار گیرید</p>
        </div>
      ),
    },
    {
      value: "insurance",
      title: "بیمه و پوشش بیمه‌ای",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• تمامی خودروها تحت بیمه نامه مشخص قرار دارند</p>
          <p>• پوشش شامل: سرقت کلی، سرقت درجا، خسارت تصادف، آتش‌سوزی، بلایای طبیعی، شکست شیشه و رنگ می‌باشد</p>
          <p>• درج بیمه تکمیلی به صورت اختیاری برای اجاره‌گیرنده ممکن است</p>
        </div>
      ),
    },
    {
      value: "amendments",
      title: "تمدید قرارداد",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• تمدید قرارداد اجاره به صورت حضوری و با توافق طرفین انجام می‌شود</p>
          <p>• در شرایط خاص و توافق دو طرف، تمدید غیرحضوری با واریز کامل مبلغ امکان‌پذیر است</p>
          <p>• قیمت تمدید بر اساس شرایط روز و توافق میزبان و اجاره‌گیرنده مشخص می‌شود</p>
        </div>
      ),
    },
    {
      value: "dispute",
      title: "حل اختلاف",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• تمامی اختلافات ناشی از این قوانین و مقررات تحت نظارت تیم پشتیبانی کارِمون حل خواهد شد</p>
          <p>• در صورت عدم توافق، اختلاف به مرجع قانونی مربوطه ارجاع خواهد شد</p>
        </div>
      ),
    },
  ];

export default function TermsAndConditionsPage(): ReactElement {
  return (
    <div className="w-full min-w-0 max-w-full px-4 lg:max-w-5xl lg:px-6 lg:mx-auto">
      <BreadcrumbNav
        items={[
          { label: "خانه", href: "/" },
          { label: "قوانین و مقررات" },
        ]}
        className="pt-4 pb-2"
      />
      {/* Hero */}
      <section className="py-6 text-center lg:py-10">
        <div className="space-y-2 lg:space-y-3">
          <div className="flex justify-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center lg:w-12 lg:h-12">
              <ScrollText className="w-5 h-5 text-primary lg:w-6 lg:h-6" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-4xl">
            قوانین و <span className="text-primary">مقررات</span>
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed lg:text-lg">
            شرایط و قوانین اجاره خودرو در کارِمون. لطفاً این مقررات را به دقت مطالعه کنید
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-6 lg:py-10">
        <div className="rounded-lg border border-border p-4 space-y-2 lg:p-5 lg:space-y-3">
          <p className="text-foreground text-sm leading-relaxed lg:text-base">
            کارِمون یک مارکت‌پلیس اجاره خودرو است؛ کاربران می‌توانند هم خودروی خود را برای اجاره قرار دهند (هولدر) و هم از خودروهای دیگران اجاره بگیرند. برای استفاده از هر یک از این خدمات، تمامی کاربران متعهد به رعایت این قوانین و مقررات هستند. این قوانین شامل شرایط اجاره، مسئولیت‌های میزبان و مهمان، شرایط بازگشت خودرو، نحوه پرداخت و سایر موارد مرتبط است.
          </p>
          <p className="text-foreground text-sm leading-relaxed lg:text-base">
            با ادامه استفاده از خدمات کارِمون، شما تأیید می‌کنید که تمام شرایط زیر را خوانده و پذیرفته‌اید.
          </p>
        </div>
      </section>

      {/* Accordion */}
      <section className="py-6 w-full min-w-0 lg:py-10">
        <Accordion sections={RULES_SECTIONS} defaultValue="intro" />
      </section>

      {/* Footer note */}
      <section className="py-6 text-center border-t border-border space-y-1 lg:py-10">
        <p className="text-xs text-muted-foreground lg:text-sm">
          آخرین بروزرسانی: <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString("fa-IR")}</time>
        </p>
        <p className="text-xs text-muted-foreground lg:text-sm">
          کارِمون حق دارد این قوانین را هرزمان تغییر دهد. تغییرات از طریق وب‌سایت اطلاع رسانی خواهند شد.
        </p>
      </section>
    </div>
  );
}
