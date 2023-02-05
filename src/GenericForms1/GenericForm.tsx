import React, { FC } from 'react';
import {Grid} from '@mui/material';
import {FormData} from './GenericFormInterface';
import FormElements from './index';

const GenericForm: FC<FormData> = ({
  handleFormSubmit,
  formElements,
  visibilitySubmitBtn,
  initialValues,
  validationSchema,
  submitButtonDetails
}) => {
  return (
        <Grid item xs={12} sm={12} md={12} lg={12}>
            <FormElements
              submitButtonDetails={submitButtonDetails}
              handleFormSubmit={handleFormSubmit}
              formElements={formElements}
              initialValues={initialValues}
              validationSchema={validationSchema}
              visibilitySubmitBtn={visibilitySubmitBtn}
            />
        </Grid>
  );
}

export default GenericForm;
