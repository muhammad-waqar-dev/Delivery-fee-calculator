export interface FormCreationData {
  label: string;
  name: string;
  type: string;
  placeholderText?: string;
  disabled?: boolean;
  defaultValue?: any;
  inputLabelShrink?: boolean;
}

export interface ISubmitButtonDetails {
  isSubmitButtonDisabled?: boolean;
  isSubmitButtonVisible?: boolean;
  submitText?: string;
}

export interface FormData {
  handleFormSubmit: (values: any, actions?: any) => void;
  formElements: FormCreationData[];
  initialValues?: any;
  validationSchema: any;
  submitButtonDetails: ISubmitButtonDetails;
}
