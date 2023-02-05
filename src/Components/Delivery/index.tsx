import React, { useEffect, useState } from "react";
import { findDeloveryFee } from "../../Helpers/DeliverFeeCalculator";
import { IFindDeloveryFeeResult } from "../../Helpers/DeliverFeeCalculatorInterface";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {useField } from "formik";
import { object, number, date, string } from "yup";
import dayjs, { Dayjs } from "dayjs";
import { formElements, initialValues } from "../../Contstants/FormElement";
import GenericForm from "../../GenericForm";
import { resources } from "../../Contstants/resources";
import { Grid, Container, Typography, CssBaseline, Divider } from "@mui/material";

const theme = createTheme();

const validationSchema = object({
  cartValue: number().required("Cart value is required"),
  deliveryDistance: number().required("Delivery distance is required"),
  noOfItems: number().required("Number of items required"),
  dateTime: date().required("Date time is required"),
});

const DeliveryComponent = () => {
  const [deliverFeeResult, setDeliveryFeeResult] =
    useState<IFindDeloveryFeeResult>({} as IFindDeloveryFeeResult);


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


  useEffect(() => {
    return () => {
      setDeliveryFeeResult({} as IFindDeloveryFeeResult);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Grid
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
          <Grid mb={{ xs: 3 }}>
            <Typography
              mt={{ xs: 4 }}
              mb={{ xs: 2 }}
              component="h6"
              variant="h6"
              style={{ color: "gray" }}
            >
              {resources.form_Heading}
            </Typography>
          </Grid>
          
          <GenericForm
            handleFormSubmit={(values: any, actions: any) => {
              handleFormSubmit(values, actions);
            }}
            formElements={formElements}
            initialValues={initialValues}
            validationSchema={validationSchema}
            submitButtonDetails={{
              isSubmitButtonDisabled: false,
              isSubmitButtonVisible: true,
              submitText: resources.submit_button_text,
            }}
          />

        </Grid>
        <Grid
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
          <Grid sx={{ padding: "1.5rem" }}>
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
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

DeliveryComponent.propTypes = {};

export default DeliveryComponent;
