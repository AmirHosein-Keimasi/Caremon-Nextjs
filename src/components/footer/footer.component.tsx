import { ReactElement } from "react";

import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Send,
  X,
} from "lucide-react";

export default function FooterComponent(): ReactElement {
  return (
    <footer className="text-foreground text-center">
      <div className="flex items-center justify-center border-b border-border py-4 lg:justify-between">
        <div className="hidden lg:block">
          <span>ما را در شبکه‌های اجتماعی دنبال کنید</span>
        </div>
        <div className="flex">
          <a href="#" className="mr-3">
            <Github className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-4 w-4" />
          </a>
          <a href="#" className="mr-3">
            <X className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-4 w-4" />
          </a>
          <a href="#" className="mr-3">
            <Linkedin className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-4 w-4" />
          </a>
          <a href="#" className="mr-3">
            <Instagram className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-4 w-4" />
          </a>
          <a href="#" className="mr-3">
            <Send className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-4 w-4" title="تلگرام" />
          </a>
        </div>
      </div>

      <div>
        <div className="grid mt-4 text-center md:grid-cols-3">
          <div className="text-left pb-8">
            <h6 className="mb-2 flex justify-center font-semibold text-base text-foreground md:justify-start">
              آدرس ما
            </h6>
            <p className="flex justify-start text-sm text-foreground md:justify-start">
              <span className="ml-2">
                <MapPin className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-5 w-5" />
              </span>
              تهران، خیابان آزادی، بلوار کشاورز، پلاک ۱۲۳
            </p>
          </div>

          <div className="text-left pb-8">
            <h6 className="mb-2 flex justify-center font-semibold text-base text-foreground md:justify-start">
              تماس با ما
            </h6>

            <p className="flex justify-start text-sm text-foreground md:justify-start">
              <span className="ml-2">
                <Mail className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-5 w-5" />
              </span>
              info@example.com
            </p>
            <p className="flex justify-start text-sm text-foreground md:justify-start">
              <span className="ml-2">
                <Phone className="text-foreground opacity-75 transition-all duration-300 ease-in-out hover:opacity-100 hover:scale-125 h-5 w-5" />
              </span>
              ۰۲۱-۱۲۳۴۵۶۷۸
            </p>
          </div>
          <div className="text-left pb-8">
            <p className="text-foreground">
              پلتفرمی یکپارچه برای اجاره خودرو و رزرو آنلاین ماشین در سراسر
              ایران
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
