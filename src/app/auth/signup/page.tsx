import Image from "next/image";

import SignupForm from "./components/signup-form";

export default function SignupPage() {
  return (
    <div className="flex flex-wrap items-center justify-center lg:justify-between lg:p-16">
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
