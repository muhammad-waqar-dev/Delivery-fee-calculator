import React, { useEffect, useState } from "react";
import { findDeloveryFee } from "../../Helpers/DeliverFeeCalculator";
import { IFindDeloveryFeeResult } from "../../Helpers/DeliverFeeCalculatorInterface";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, useField } from "formik";
import { object, number, date, string } from "yup";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { formElements, formElements1, initialValues } from "../../Contstants/FormElement";
import GenericForm from "../../GenericForm";
import { resources } from "../../Contstants/resources";
import { Grid, Button, TextField, Container, Typography, CssBaseline } from "@mui/material";
const theme = createTheme();

const validationSchema = object({
  cartValue: number().required("Cart value is required"),
  deliveryDistance: number().required("Delivery distance is required"),
  noOfItems: number().required("Number of items required"),
  dateTime: date().required("Date time is required"),
});
const custom = () => {


  const [deliverFeeResult, setDeliveryFeeResult] =
  useState<IFindDeloveryFeeResult>({} as IFindDeloveryFeeResult);

const [value, setValue] = useState<Dayjs | null>(dayjs());

const handleFormSubmit = (event: any, actions: any) => {
  const result = findDeloveryFee({
    cartValueInEuro: event?.cartValue,
    deliveryDistanceInMeter: event?.deliveryDistance,
    noOfItems: event?.noOfItems,
    time: event?.dateTime,
  });

  setDeliveryFeeResult({ ...result });
  actions.resetForm();
};

const handleChangeDateTime = (newValue: Dayjs | null) => {
  setValue(newValue);
};

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

useEffect(() => {
  return () => {
    setDeliveryFeeResult({} as IFindDeloveryFeeResult);
  };
}, []);
  return (
    <Formik
    validateOnChange={true}
    initialValues={{ ...initialValues }}
    validationSchema={validationSchema}
    enableReinitialize={true}
    onSubmit={(values, actions) => {
      handleFormSubmit(values, actions);
    }}
  >
    {({ isSubmitting, values, errors }) => {
      return (
        <Form
          noValidate
          autoComplete="off"
          style={{
            width: "100%",
            paddingRight: "1.5rem",
            paddingLeft: "1.5rem",
          }}
        >
          {formElements1 && formElements1.map((elementItems: any, index: number) => {
            switch (elementItems.type) {
              case "number": {
                return (
                  <Grid mb={{ xs: 5 }} key={index}>
                    <MyTextField
                      placeholder={`Please enter ${elementItems.label}`}
                      name={elementItems.name}
                      label={elementItems.label}
                      variant="outlined"
                      type={elementItems.type}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                );
              }
              case "dateTime": {
                return (
                  <Grid mb={{ xs: 5, lg: 5 }} key={index}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        toolbarPlaceholder={`Please enter ${elementItems.label}`}
                        label={elementItems.label}
                        value={value}
                        onChange={handleChangeDateTime}
                        renderInput={(params) => {
                          return (
                            <MyTextField
                              variant="outlined"
                              placeholder={`Please enter ${elementItems.label}`}
                              name={elementItems.name}
                              value={value}
                              {...params}
                            />
                          );
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>
                );
              }
              default: {
                return (
                  <Grid mb={{ xs: 5, lg: 8 }} key={index}>
                    <p> Loading...</p>
                  </Grid>
                );
              }
            }
          })}
          <Grid style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }} >
            <Button
              variant="contained"
              color="secondary"
              disabled={isSubmitting}
              type="submit"
              style={{
                width: "100%",
                paddingTop: "1.5rem",
                paddingBottom: "1.5rem",
                borderTopRightRadius: 0,
                borderTopLeftRadius: 0,
                borderBottomRightRadius: "10px",
                borderBottomLeftRadius: "10px",
                backgroundColor: "#00c2e8",
              }}
            >
              Calculate delivery fee
            </Button>
          </Grid>
        </Form>
      );
    }}
  </Formik>
  )
}

export default custom