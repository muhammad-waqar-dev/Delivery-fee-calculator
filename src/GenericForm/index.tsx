import React, { FC } from 'react';
import {Grid} from '@mui/material';
import {FormData} from './GenericFormInterface';
import GenericFormElements from './GenericFormElements';

const GenericForm : FC<FormData> = ({
  handleFormSubmit,
  formElements,
  initialValues,
  validationSchema,
  submitButtonDetails
}) => {
  return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <GenericFormElements
              submitButtonDetails={submitButtonDetails}
              handleFormSubmit={handleFormSubmit}
              formElements={formElements}
              initialValues={initialValues}
              validationSchema={validationSchema}
            />
        </Grid>
  );
}

export default GenericForm;
