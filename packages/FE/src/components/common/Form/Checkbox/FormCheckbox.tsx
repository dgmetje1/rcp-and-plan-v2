import React from "react";
import { Checkbox, FormControlLabel } from "@mui/material";
import { useController } from "react-hook-form";

import { FormCheckboxProps } from "./types";

const FormCheckbox = ({ label, name, ...rest }: FormCheckboxProps) => {
  const inputRef = React.useRef(null);

  const { field } = useController({ name });

  return (
    <FormControlLabel control={<Checkbox {...rest} checked={field.value} {...field} ref={inputRef} />} label={label} />
  );
};

export default FormCheckbox;
