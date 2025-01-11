import { FormEvent, PropsWithChildren, useCallback, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { FormProps } from "./types";

const Form = <FormValues extends object>({
  children,
  defaultValues,
  onFormSubmit,
  onFormSubmitError,
  validationSchema,
  ...rest
}: PropsWithChildren<FormProps<FormValues>>) => {
  const formProps = useMemo(
    () => ({
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      defaultValues: defaultValues as any,
      resolver: zodResolver(validationSchema),
    }),
    [defaultValues, validationSchema],
  );

  type Schema = z.infer<typeof validationSchema>;
  const methods = useForm<Schema>(formProps);
  const { handleSubmit, reset } = methods;

  const onFormSubmitValid = useCallback<typeof onFormSubmit>(
    values => {
      onFormSubmit(values);
      reset();
    },
    [onFormSubmit, reset],
  );

  const onSubmitted = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.stopPropagation();

      await handleSubmit(onFormSubmitValid, onFormSubmitError)(e);
    },
    [handleSubmit, onFormSubmitError, onFormSubmitValid],
  );

  return (
    <FormProvider {...methods}>
      <form {...rest} onSubmit={onSubmitted}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
