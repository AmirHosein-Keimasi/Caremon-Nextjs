"use client";

import { FC } from "react";
import { ConfirmationDialogProps } from "./types";

import styles from "./confirmation-dialog.module.css";

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
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.message}>{message}</p>

        <div className={styles.buttonsContainer}>
          <button
            onClick={handleCancel}
            className={`${styles.button} ${styles.cancelButton}`}
            type="button"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`${styles.button} ${styles.confirmButton}`}
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
