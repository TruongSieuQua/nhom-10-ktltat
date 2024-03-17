import { toast, ToastPosition, TypeOptions } from "react-toastify";

export const showMessage = (
  message: string,
  type: TypeOptions = "success",
  position: ToastPosition = "bottom-right",
  className?: string,
): void => {
  toast(message, {
    position,
    className,
    type,
  });
};
