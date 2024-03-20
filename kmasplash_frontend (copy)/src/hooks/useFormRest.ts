import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Type } from "typescript";

export const useFormReset = ({
  initialValues,
  FormValidatorSchema,
}: {
  initialValues: any;
  FormValidatorSchema: any;
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    clearErrors,
    getValues,
    reset,
  } = useForm<Type>({
    resolver: zodResolver(FormValidatorSchema),
    defaultValues: initialValues,
  });

  return {
    handleSubmit,
    control,
    errors,
    clearErrors,
    getValues,
  };
};
