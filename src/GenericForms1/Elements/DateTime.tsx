import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";

function FormikDate(props: any) {
  const { name, label, additionalAction, values, visibility, options } = props;

  const meta = useField(name)[1];

  const { setFieldValue } = useFormikContext();

  const [selectedDate, setselectedDate] = useState();

  const handleChange = (event: any) => {
    if (additionalAction) {
      additionalAction(event);
    }
    const { value } = event.target;
    setFieldValue(name, value, true);
  };

  let errorMessage: string = "";

  const configFormControl = { error: false };

  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
    errorMessage = meta.error;
  }

  const Visibility = () => visibility(values);

  if (visibility) {
    return (
      <div>
        <FormControl {...configFormControl}>
          <FormGroup>
            <FormControlLabel
              label={label}
              labelPlacement="start"
              control={
                <TextField
                  id="datetime-local"
                  onChange={handleChange}
                  label="Time Restore"
                  type="datetime-local"
                  defaultValue=""
                  sx={{ width: 300 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              }
            />
          </FormGroup>
          <FormLabel component="legend">{errorMessage}</FormLabel>
        </FormControl>
      </div>
    );
  } else {
    return null;
  }
}

export default FormikDate;