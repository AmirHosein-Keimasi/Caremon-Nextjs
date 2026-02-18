import Image from "next/image";

import SigninForm from "./components/signin-form";

export default function SigninPage() {
  return (
    <div className="flex flex-wrap items-center  justify-center lg:justify-between lg:p-16">
      <div className="w-full max-w-[28rem]">
        <SigninForm />
      </div>

      {/* Illustration Section */}
      <div className="hidden lg:block lg:w-1/2 lg:max-w-[600px]">
        <Image
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
          className="w-full h-auto object-contain"
          width={500}
          height={400}
          alt="تصویر ورود"
          priority
        />
      </div>
    </div>
  );
}
