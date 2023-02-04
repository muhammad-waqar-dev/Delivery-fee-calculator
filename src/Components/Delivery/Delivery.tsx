import React, { useEffect, useState } from "react";
import { findDeloveryFee } from "../../Helpers/DeliverFeeCalculator";
import { IFindDeloveryFeeResult } from "../../Helpers/DeliverFeeCalculatorInterface";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Form, Formik, useField } from "formik";
import { object, number, date } from "yup";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { formElements, initialValues } from "../../Contstants/FormElement";

const theme = createTheme();

const validationSchema = object({
  cardValue: number().required("Card value is required"),
  deliveryDistance: number().required("Delivery distance is required"),
  noOfItems: number().required("Number of items required"),
  dateTime: date().required("Date time is required"),
});

const DeliveryComponent = () => {
  const [deliverFeeResult, setDeliveryFeeResult] =
    useState<IFindDeloveryFeeResult>({} as IFindDeloveryFeeResult);

  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const handleSubmit = (event: any, actions: any) => {
    const result = findDeloveryFee({
      cardValueInEuro: event?.cardValue,
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "white",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <Box mb={{ xs: 3 }}>
            <Typography
              mt={{ xs: 4 }}
              mb={{ xs: 2 }}
              component="h6"
              variant="h6"
              style={{ color: "gray" }}
            >
              Delivery Fee Calculator
            </Typography>
          </Box>

          <Formik
            validateOnChange={true}
            initialValues={{ ...initialValues }}
            validationSchema={validationSchema}
            enableReinitialize={true}
            onSubmit={(values, actions) => {
              handleSubmit(values, actions);
            }}
          >
            {({ isSubmitting, values, errors }) => {
              //  console.log("form--", errors, values);
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
                  {formElements.map((elementItems: any, index: number) => {
                    switch (elementItems.type) {
                      case "number": {
                        return (
                          <Box mb={{ xs: 5 }} key={index}>
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
                          </Box>
                        );
                      }
                      case "dateTime": {
                        return (
                          <Box mb={{ xs: 5, lg: 5 }} key={index}>
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
                          </Box>
                        );
                      }
                      default: {
                        return (
                          <Box mb={{ xs: 5, lg: 8 }} key={index}>
                            <p> Loading...</p>
                          </Box>
                        );
                      }
                    }
                  })}
                  <Box
                    style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }}
                  >
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
                  </Box>
                </Form>
              );
            }}
          </Formik>
        </Box>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#00c2e8",
            color: "black",
            borderRadius: "10px",
          }}
        >
          <Box sx={{ padding: "1.5rem" }}>
            <Typography
              sx={{ color: "white", fontWeight: "normal" }}
              component="h6"
              variant="h6"
            >
              Delivery Fee: {deliverFeeResult?.fee} €
            </Typography>
            <Typography
              sx={{
                color: deliverFeeResult?.status ? "green" : "red",
                fontWeight: "normal",
              }}
              variant="h6"
            >
              {deliverFeeResult?.message}
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

DeliveryComponent.propTypes = {};

export default DeliveryComponent;
