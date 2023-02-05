import React, { useState } from "react";
import { useField, useFormikContext } from "formik";
import {TextField, Grid} from "@mui/material";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function FormikDate(props: any) {
  const { name, label, key, additionalAction, values, visibility, placeholderText, options } = props;

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
  const [dateTimeValue, setDateTimeValue] = useState<Dayjs | null>(dayjs());

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
  const Visibility = () => visibility(values);
  const handleChangeDateTime = (newValue: Dayjs | null) => {
    setDateTimeValue(newValue);
  };
  if (visibility) {
    return (
      <Grid mb={{ xs: 5, lg: 5 }} key={key}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateTimePicker
          toolbarPlaceholder={placeholderText}
          label={label}
          value={dateTimeValue}
          onChange={handleChangeDateTime}
          renderInput={(params) => {
            return (
              <MyTextField
                variant="outlined"
                placeholder={placeholderText}
                name={name}
                value={dateTimeValue}
                {...params}
              />
            );
          }}
        />
      </LocalizationProvider>
    </Grid>

      // <div>
      //   <FormControl {...configFormControl}>
      //     <FormGroup>
      //       <FormControlLabel
      //         label={label}
      //         labelPlacement="start"
      //         control={
      //           <TextField
      //             id="datetime-local"
      //             onChange={handleChange}
      //             label="Time Restore"
      //             type="datetime-local"
      //             defaultValue=""
      //             sx={{ width: 300 }}
      //             InputLabelProps={{
      //               shrink: true,
      //             }}
      //           />
      //         }
      //       />
      //     </FormGroup>
      //     <FormLabel component="legend">{errorMessage}</FormLabel>
      //   </FormControl>
      // </div>
    );
  } else {
    return null;
  }
}

export default FormikDate;
