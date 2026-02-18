import { ReactElement } from "react";

 import LayoutContainer from "@/components/layout-container/layout-container.component";
import Link from "next/link";
import {
  Car,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from "lucide-react";

const iconClass =
  "text-muted-foreground hover:text-foreground transition-all duration-300 ease-in-out hover:scale-125 size-4";

export default function FooterComponent(): ReactElement {
  return (
    <footer className="text-foreground mt-auto w-full flex flex-col items-center bg-background ">
      <LayoutContainer>
        {/* بخش شبکه‌های اجتماعی */}
        <div className="flex flex-col sm:flex-row items-center  justify-center gap-6 sm:justify-between sm:gap-12 border-b border-border  ">
          <span className="text-sm text-muted-foreground mb-4 order-1 sm:order-1">
            ما را در شبکه‌های اجتماعی دنبال کنید
          </span>
          <div className="flex items-center gap-5 order-2 sm:order-2">
            <a href="#" title="تلگرام" className={iconClass}>
              <Send className="size-4" />
            </a>
            <a href="#" title="اینستاگرام" className={iconClass}>
              <Instagram className="size-4" />
            </a>
            <a href="#" title="لینکدین" className={iconClass}>
              <Linkedin className="size-4" />
            </a>
            <a href="#" title="ایکس" className={iconClass}>
              <X className="size-4" />
            </a>
            <a href="#" title="گیت‌هاب" className={iconClass}>
              <Github className="size-4" />
            </a>
          </div>
        </div>

        {/* بخش سه ستونی */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.5fr] gap-12 md:gap-16 py-5 sm:py-6 text-center md:text-start">
          {/* آدرس ما */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h6 className="text-base font-semibold text-foreground">
              آدرس ما
            </h6>
            <p className="text-sm text-muted-foreground flex items-start gap-2 justify-center md:justify-start leading-relaxed">
              <MapPin className="size-5 shrink-0 mt-0.5" />
              تهران، خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳
            </p>
          </div>

          {/* تماس با ما */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h6 className="text-base font-semibold text-foreground">
              تماس با ما
            </h6>
            <div className="flex flex-col gap-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Mail className="size-5 shrink-0" />
                info@example.com
              </p>
              <p className="flex items-center gap-2 justify-center md:justify-start">
                <Phone className="size-5 shrink-0" />
                ۰۲۱-۱۲۳۴۵۶۷۸
              </p>
            </div>
          </div>

          {/* توضیحات و لینک */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              مارکت‌پلیس اجاره خودرو: خودروی خود را برای اجاره ثبت کنید یا از دیگران اجاره بگیرید.
            </p>
            <Link
              href="/cars/add"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              <Car className="size-4" />
              خودروی خود را برای اجاره ثبت کنید
            </Link>
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
}
