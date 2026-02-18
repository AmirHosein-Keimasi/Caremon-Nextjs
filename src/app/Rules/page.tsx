
import { ScrollText } from "lucide-react";
import Accordion, { type AccordionSectionItem } from "@/components/Accordion/Accordion.component";

const RULES_SECTIONS: AccordionSectionItem[] = [
    {
      value: "intro",
      title: "شرایط عمومی و مقدمات",
      content: (
        <div className="space-y-3 text-muted-foreground leading-relaxed">
          <p>• کا‌‌‌‌رِمون یک پل ارتباطی است میان میزبان (اجاره‌دهنده) و مهمان (اجاره‌گیرنده) خودرو</p>
          <p>• تمامی خودروها بر اساس قوانین و مقررات شعب مختلف کارِمون، معاینه و بیمه شده‌اند</p>
          <p>• هر خودرو دارای شناسه منحصر به فردی است که با آن می‌توان اطلاعات آن را رهگیری کرد</p>
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

export default function TermsAndConditionsPage() {
  return (
    <div className="w-full min-w-0 max-w-full px-4 lg:max-w-5xl lg:px-6 lg:mx-auto">
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
            برای اجاره هر نوع خودرو در کارِمون، تمامی کاربران متعهد به رعایت این قوانین و مقررات هستند. این قوانین شامل شرایط اجاره، مسئولیت‌های کاربران، شرایط بازگشت خودرو، نحوه پرداخت و سایر موارد مرتبط است.
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
          آخرین بروزرسانی: {new Date().toLocaleDateString("fa-IR")}
        </p>
        <p className="text-xs text-muted-foreground lg:text-sm">
          کارِمون حق دارد این قوانین را هرزمان تغییر دهد. تغییرات از طریق وب‌سایت اطلاع رسانی خواهند شد.
        </p>
      </section>
    </div>
  );
}
