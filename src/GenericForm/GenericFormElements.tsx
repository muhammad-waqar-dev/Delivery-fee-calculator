import React, { FC } from "react";
import { Formik, Form } from "formik";
import Components from "./Elements/GenericFormElements";
import { Grid, Button } from "@mui/material";
import { FormData } from "./GenericFormInterface";
import { formElementTypes } from "../Contstants/FormElement";

const { CustomNumberField, CustomDateTime } = Components;

const GenericForm: FC<FormData> = ({
  handleFormSubmit,
  formElements,
  initialValues,
  validationSchema,
  submitButtonDetails
}) => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      enableReinitialize={true}
      validateOnChange={true}
      onSubmit={(values, actions) => {
        handleFormSubmit(values, actions);
      }}
    >
      {({ values, isSubmitting }) => {
        const defaultVisibilityFunction = (func: any) => {
          if (func) return func(values);
          return true;
        };
        return (
          <Form    
          noValidate
          autoComplete="off"
          style={{
            width: "100%",
            paddingRight: "1.5rem",
            paddingLeft: "1.5rem",
          }}>
            {formElements &&
              formElements.map((formElement: any, index: number) => {
                let Component: any;
                switch (formElement.type) {
                  case formElementTypes.NUMBER:
                    Component = (
                      <CustomNumberField
                         key={index}
                        additionalAction={formElement.onChange}
                        name={formElement.name}
                        label={formElement.label}
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
                        inputLabelShrink={formElement?.inputLabelShrink}
                      />
                    );
                    break;
                  case formElementTypes.DATETIME:
                    Component = (
                      <CustomDateTime
                      key={index}
                        additionalAction={formElement.onChange}
                        name={formElement.name}
                        label={formElement.label}
                        values={values}
                        visibility={defaultVisibilityFunction(
                          formElement.visibility
                        )}
                      />
                    );
                    break;
                  default:
                    Component = (
                      <Grid mb={{ xs: 5, lg: 8 }} key={index}>
                        <div>{formElement.type} is not defined</div>
                      </Grid>
                    );
                    break;
                }
                return (
                  <>
                    {defaultVisibilityFunction(formElement?.visibility) ? (
                      <>
                          {Component}
                      </>
                    ) : null}
                  </>
                );
              })}

            {submitButtonDetails?.isSubmitButtonVisible && (
              <Grid  style={{ marginLeft: "-1.5rem", marginRight: "-1.5rem" }} >
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
                  {submitButtonDetails?.submitText}
                </Button>
              </Grid>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default GenericForm;
