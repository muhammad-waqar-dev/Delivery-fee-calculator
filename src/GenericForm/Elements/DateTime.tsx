import React, { useState } from "react";
import { useField } from "formik";
import {TextField, Grid} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

function FormikDate(props: any) {
  const { name, label, key, placeholderText, inputLabelShrink, disabled } = props;

  const [dateTimeValue, setDateTimeValue] = useState<Dayjs | null>(dayjs());

  const Field = (props: any) => {
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

  const handleChangeDateTime = (newValue: Dayjs | null) => {
    setDateTimeValue(newValue);
  };
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
              <Field
                variant="outlined"
                placeholder={placeholderText}
                name={name}
                label={label}
                value={dateTimeValue}
                disabled={disabled}
                {...params}
              />
            );
          }}
        />
      </LocalizationProvider>
    </Grid>
    );
  
}

export default FormikDate;
