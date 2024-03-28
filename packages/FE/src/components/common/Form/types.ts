import { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { UseFormProps } from "react-hook-form";

export type Props<FormValues extends object> = {
  readonly children: React.ReactNode;
  readonly defaultValues: UseFormProps<FormValues>["defaultValues"];
  readonly onFormSubmit: (values: FormValues) => void;
};

export type FormProps<FormValues extends object> = Props<FormValues> &
  DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>;
