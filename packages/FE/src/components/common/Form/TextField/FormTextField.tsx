import React from "react";
import { useController } from "react-hook-form";
import { TextField } from "@mui/material";

const FormTextField = ({ name, ...rest }) => {
  const inputRef = React.useRef(null);

  const { field } = useController({ name });

  return <TextField {...rest} {...field} ref={inputRef} />;
};

export default FormTextField;
