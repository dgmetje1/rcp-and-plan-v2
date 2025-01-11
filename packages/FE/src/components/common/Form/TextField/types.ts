import { TextFieldProps } from "@mui/material";
import { UseControllerProps } from "react-hook-form";

export type FormTextFieldProps = { label: string } & UseControllerProps & TextFieldProps;
