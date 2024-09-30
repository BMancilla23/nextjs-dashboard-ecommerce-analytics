import { useEffect } from "react";
import toast from "react-hot-toast";

export const FormError = ({ message }: { message: string }) => {
  useEffect(() => {
    if (message) toast.error(message);
  }, [message]);

  return null;
};
