import React, { FC } from 'react';
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
            <GenericFormElements
              submitButtonDetails={submitButtonDetails}
              handleFormSubmit={handleFormSubmit}
              formElements={formElements}
              initialValues={initialValues}
              validationSchema={validationSchema}
            />
  );
}

export default GenericForm;
