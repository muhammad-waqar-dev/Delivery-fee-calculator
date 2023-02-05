import React from "react";
import { useField } from "formik";
import ErrorIcon from "@mui/icons-material/Error";
import { TextField, Grid, Tooltip } from "@mui/material";

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

  const [field, mata] = useField(name);

  const configTextField = {
    ...field,
    ...others,
    fullWidth: true,
    variant: "outlined",
    disabled: disabled,
    placeholder: placeholderText,
  };

  if (additionalAction) {
    configTextField.onChange = (event: any) => {
      additionalAction(event);
      field.onChange(event);
    };
  }

  if (helperText) {
    configTextField.helperText = helperText;
  }

  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  if (helperText && !mata.error) {
    configTextField.helperText = helperText;
  }

  const Visibility = () => visibility(values);

  const MyTextField = (props: any) => {
    const [field, meta] = useField(props);
    const errorText = meta.error && meta.touched ? meta.error : "";

    return (
      <TextField
        {...props}
        {...field}
        helperText={errorText}
        error={!!errorText}
        fullWidth={true}
      />
    );
  };

  return (
    <Grid mb={{ xs: 5 }} key={key}>
      <MyTextField
        placeholder={placeholderText}
        name={name}
        label={label}
        variant="outlined"
        type={type}
        InputLabelProps={{
          shrink: inputLabelShrink,
        }}
      />
    </Grid>
  );
  // if (visibility) {
  //   return toolTipText ? (
  //     <>
  //       <Tooltip title={toolTipText}>
  //         <div>
  //           <div style={{ width: description ? "50%" : "100%" }}>
  //             <TextField {...configTextField} />
  //           </div>
  //           {description ? (
  //             <div>
  //               <strong>{name}</strong>
  //               <p>{description}</p>
  //             </div>
  //           ) : null}
  //         </div>
  //       </Tooltip>
  //     </>
  //   ) : (
  //     <>
  //       <div>
  //         <div style={{ width: description ? "50%" : "100%" }}>
  //           <TextField {...configTextField} />
  //         </div>
  //         {description ? (
  //           <div>
  //             <strong>{name}</strong>
  //             <p>{description}</p>
  //           </div>
  //         ) : null}
  //       </div>
  //     </>
  //   );
  // } else {
  //   return null;
  // }
}

export default CustomNumberField;
