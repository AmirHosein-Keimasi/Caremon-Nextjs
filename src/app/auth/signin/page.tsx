import Image from "next/image";

import SigninForm from "./components/signin-form";

export default function SigninPage() {
  return (
    <div className="w-full min-w-0 max-w-full px-4 py-6 lg:max-w-7xl flex justify-between lg:px-6 lg:py-8 lg:mx-auto">
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
