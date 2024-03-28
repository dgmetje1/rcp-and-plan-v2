import React from "react";
import { TextField } from "@mui/material";
import { useController } from "react-hook-form";

const FormTextField = ({ name, ...rest }) => {
  const inputRef = React.useRef(null);

  const { field } = useController({ name });

  return <TextField {...rest} {...field} ref={inputRef} />;
};

export default FormTextField;
