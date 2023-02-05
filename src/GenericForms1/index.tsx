import React from "react";
import { Formik, Form } from "formik";
import Components from "./Elements";
import ServicesFooter from ".";
// import {BrandingWatermark} from '@material-ui/icons';
import { Grid, Divider, Theme } from "@mui/material";

const { CustomNumberField, CustomDateTime } = Components;

const ServicesFooterFormik = (props: any) => {
  const {
    handleFormSubmit,
    handleVerifySubmit,
    formElements,
    initialValues,
    validationSchema,
    // visibilitySubmitBtn,
    submitText,
    disabled,
    hideHeader,
    submitButtonDetails = { isDrawer: false },
    id,
  } = props;

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize={true}
      onSubmit={(values, actions) => {
        handleFormSubmit(values, actions);
      }}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        handleReset,
        values,
        touched,
        errors,
      }) => {
        const defaultVisibilityFunction = (func: any) => {
          if (func) return func(values);
          return true;
        };
        console.log("values :", values);
        console.log("errors : ", errors);
        return (
          <Form>
            {formElements &&
              formElements.map((formElement: any) => {
                let Component: any;
                console.log("type--", formElement.type);
                switch (formElement.type) {
                  case 'dateTime':
                    Component = (
                      <CustomDateTime
                        additionalAction={formElement.onChange}
                        name={formElement.name}
                        label={formElement.label}
                        values={values}
                        visibility={defaultVisibilityFunction(
                          formElement.visibility,
                        )}
                      />
                    );
                    break;
                  case "number":
                    Component = (
                      <CustomNumberField
                        additionalAction={formElement.onChange}
                        name={formElement.name}
                        label={formElement.label}
                        portRange={formElement.portRange}
                        description={formElement?.description}
                        type={formElement.type}
                        values={values}
                        placeholderText={
                          formElement.placeholderText
                            ? formElement.placeholderText
                            : ""
                        }
                        toolTipText={
                          formElement.toolTipText ? formElement.toolTipText : ""
                        }
                        helperText={
                          formElement.helperText ? formElement.helperText : ""
                        }
                        visibility={defaultVisibilityFunction(
                          formElement.visibility
                        )}
                        onClick={formElement?.onClick}
                        disabled={formElement.disabled || false}
                      />
                    );
                    break;
                  default:
                    Component = (
                      <Grid>
                        <div>{formElement.type} is not defined</div>
                      </Grid>
                    );
                    break;
                }
                return (
                  <>
                    {defaultVisibilityFunction(formElement.visibility) ? (
                      <Grid
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        item
                        key={formElement.name}
                      >
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          {Component}
                        </Grid>
                      </Grid>
                    ) : null}
                  </>
                );
              })}

            <Divider />

            {submitButtonDetails && (
              <div>
                {/* <ServicesFooter
                  submitText={submitText}
                  hideHeader={hideHeader}
                  submitButtonDetails={{...submitButtonDetails}}
                  handleFormSubmit={handleFormSubmit}
                  values={values}
                 // submitLoader={fetchLoading}
                /> */}
              </div>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default ServicesFooterFormik;
