import React from "react";
import { Slide, ToastContainer, ToastContainerProps } from "react-toastify";

type Props = Partial<ToastContainerProps>;
export default function ToasterComponent(props: Props) {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick={false}
      rtl
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
      {...props}
    />
  );
}
