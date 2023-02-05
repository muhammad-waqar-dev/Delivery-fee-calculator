import React, { useEffect, useState } from "react";
import { findDeloveryFee } from "../Helpers/DeliverFeeCalculator";
import { IFindDeloveryFeeResult } from "../Helpers/DeliverFeeCalculatorInterface";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { object, number, date, string } from "yup";
import dayjs, { Dayjs } from "dayjs";
import GenericForm from "./GenericForm";
import { resources } from "../Contstants/resources";
import { formElements1, initialValues } from "../Contstants/FormElement";

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

  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const handleSubmit = (event: any, actions: any) => {
    const result = findDeloveryFee({
      cartValueInEuro: event?.cartValue,
      deliveryDistanceInMeter: event?.deliveryDistance,
      noOfItems: event?.noOfItems,
      time: event?.dateTime,
    });

    setDeliveryFeeResult({ ...result });
    actions.resetForm({ values: initialValues});
  };

  const handleChangeDateTime = (newValue: Dayjs | null) => {
    setValue(newValue);
  };


  useEffect(() => {
    return () => {
      setDeliveryFeeResult({} as IFindDeloveryFeeResult);
    };
  }, []);

  const handleFormSubmit = (data: any) => {
  debugger
  }

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

          <GenericForm
          name='Set Application Name'
          handleFormSubmit={(values: any) => {
            handleFormSubmit(values);
          }}
          formElements={formElements1}
          initialValues={initialValues}
          validationSchema={validationSchema}
          submitButtonDetails={{
            isSubmitButtonDisabled: false,
            isSubmitButtonEnabled: true,
            submitText: resources.submit_button_text
          }} 
          />
          
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
