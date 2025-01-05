import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { SubmitErrorHandler, SubmitHandler, UseFormProps } from "react-hook-form";

export type Props<FormValues extends object> = {
  readonly defaultValues: UseFormProps<FormValues>["defaultValues"];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly validationSchema: any;
  readonly onFormSubmit: (values: Parameters<SubmitHandler<FormValues>>[0]) => void;
  readonly onFormSubmitError?: (errors: Parameters<SubmitErrorHandler<FormValues>>[0]) => void;
};

export type FormProps<FormValues extends object> = Props<FormValues> &
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
