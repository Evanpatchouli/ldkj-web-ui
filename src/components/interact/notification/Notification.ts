import { toast } from "@/components/interact/toast";

export const notification = {
  info(message: string) {
    return toast.info(message);
  },
  success(message: string) {
    return toast.success(message);
  },
  warn(message: string) {
    return toast.warn(message);
  },
  error(message: string) {
    return toast.error(message);
  },
};