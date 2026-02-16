"use client";

import { FC } from "react";
import { ConfirmationDialogProps } from "./types";

const ConfirmationDialog: FC<ConfirmationDialogProps> = ({
  isOpen,
  onConfirm,
  onCancel,
  title = "تأیید عمل",
  message = "آیا مطمئن هستید؟",
  confirmText = "تأیید",
  cancelText = "انصراف",
}) => {
  if (!isOpen) return null;

  const handleConfirm = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onConfirm();
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[var(--color-surface-400)] rounded-[var(--border-radius)] p-6 w-full max-w-[28rem] text-right shadow-[var(--shadow-800)]">
        <h2 className="text-[var(--fz-500)] font-bold mb-4 text-[var(--color-text-700)]">
          {title}
        </h2>
        <p className="mb-6 text-[var(--color-text-400)] text-[var(--fz-400)]">
          {message}
        </p>

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 rounded-[calc(var(--border-radius)/2)] cursor-pointer transition-[background-color] duration-[var(--animation-duration-fast)] border-none text-[var(--fz-300)] bg-[var(--color-surface-700)] text-[var(--color-text-400)] hover:bg-[var(--color-surface-300)]"
            type="button"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-[calc(var(--border-radius)/2)] cursor-pointer transition-[background-color] duration-[var(--animation-duration-fast)] border-none text-[var(--fz-300)] bg-[var(--color-danger)] text-[var(--color-gray-99)] hover:bg-[hsl(10,86%,30%)]"
            type="button"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
