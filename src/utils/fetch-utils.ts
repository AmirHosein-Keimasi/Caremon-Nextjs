import { fetchDataType } from "@/types/api.response.tyle";

import { toast } from "react-toastify";

export async function fetchWithToast<T>(
    input: string | URL | globalThis.Request,
    init: RequestInit={},
    successMessage?:string):Promise<fetchDataType<T>>{

        const response = await fetch(input, {
            headers: {"Content-Type": "application/json",}
           ,...init
          });
      
          const result = await response.json();
      
          if (!response.ok) {
            let message: string = "خطای غیر منتظره";
            if ("error" in result) message = result.error;
      
            toast.error(message, {
              position: "bottom-right",
            });
            return {error:message}
          }
          if(successMessage){
            toast.success(successMessage, {
                position: "bottom-right",
          })}
return result
}