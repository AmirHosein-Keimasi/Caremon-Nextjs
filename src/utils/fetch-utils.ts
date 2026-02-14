 
import { toast } from "react-toastify";

type FetchDataType<T> = T | { error: string };

export async function fetchWithToast<T>(
  input: string | URL | globalThis.Request,
  init: RequestInit = {},
  successMessage?: string,
): Promise<FetchDataType<T>> {
  const response = await fetch(input, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });

  const result = await response.json();

  if (!response.ok) {
    let message: string = "خطای غیر منتظره";
    if ("error" in result) message = result.error;

    toast.error(message, {
      position: "bottom-right",
    });
    return { error: message };
  }
  if (successMessage) {
    toast.success(successMessage, {
      position: "bottom-right",
    });
  }
  return result;
}
