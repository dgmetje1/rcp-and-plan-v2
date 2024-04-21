import { PropsWithChildren } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { FormProps } from "./types";

const Form = <FormValues extends object>({
  children,
  defaultValues,
  onFormSubmit,
  ...rest
}: PropsWithChildren<FormProps<FormValues>>) => {
  const methods = useForm({ defaultValues });
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onFormSubmit)} {...rest}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
