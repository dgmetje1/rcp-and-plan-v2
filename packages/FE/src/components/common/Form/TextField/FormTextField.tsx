import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

import { FormTextFieldProps } from "./types";

const FormTextField = ({ name, ...rest }: FormTextFieldProps) => {
  const inputRef = React.useRef(null);

  const { field } = useController({ name });

  return <TextField {...rest} {...field} ref={inputRef} />;
};

export default FormTextField;
