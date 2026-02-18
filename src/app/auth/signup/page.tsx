import type { Metadata } from "next";
import Image from "next/image";

import SignupForm from "./components/signup-form";
import { SITE_URL, defaultOpenGraph } from "@/lib/site";

export const dynamic = "force-static";

const title = "ثبت نام";
const description =
  "ثبت نام در کارِمون برای اجاره خودرو، رزرو آنلاین و ثبت خودرو در مارکت‌پلیس.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    ...defaultOpenGraph,
    title: `${title} | کارِمون`,
    description,
    url: `${SITE_URL}/auth/signup`,
  },
  alternates: {
    canonical: `${SITE_URL}/auth/signup`,
  },
};

export default function SignupPage() {
  return (
    <div className="w-full min-w-0 max-w-full px-4 py-6 lg:max-w-7xl flex justify-between lg:px-6 lg:py-8 lg:mx-auto">
      <div className="w-full max-w-[28rem]">
        <SignupForm />
      </div>

      <div className="hidden lg:block lg:w-1/2 lg:max-w-[600px]">
        <Image
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full h-auto object-contain"
          width={500}
          height={400}
          alt="تصویر ثبت نام"
          priority
        />
      </div>
    </div>
  );
}
