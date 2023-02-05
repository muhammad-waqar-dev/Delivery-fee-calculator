import React from "react";
import { useField } from "formik";
import { TextField, Grid } from "@mui/material";

function CustomNumberField(props: any) {
  const {
    key,
    name,
    label,
    type,
    description,
    additionalAction,
    visibility,
    values,
    placeholderText,
    disabled,
    toolTipText,
    helperText,
    inputLabelShrink,
    ...others
  } = props;

  const NumberField = (props: any) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
      <TextField
        {...props}
        {...field}
        helperText={errorText}
        error={!!errorText}
        fullWidth={true}
        InputLabelProps={{
          shrink: inputLabelShrink
        }}
      />
    );
  }; 

  return (
    <Grid mb={{ xs: 5 }} key={key}>
      <NumberField
        placeholder={placeholderText}
        name={name}
        label={label}
        variant="outlined"
        type={type}
      />
    </Grid>
  );
}

export default CustomNumberField;
