export interface FormCreationData {
  modelList?: any;
  dualItemList?: any;
  label: string;
  name: string;
  type: string;
  active?: string;
  helperText?: string;
  placeholderText?: string;
  toolTipText?: string;
  parallelNames?: string[];
  onChange?: (event: any, values?: any, setFieldValue?: any) => void;
  onClick?: (event: any) => void;
  rows?: number;
  dateUnits?: string[];
  visibility?: (values: any) => boolean;
  radioDefault?: any;
  checkDefault?: boolean;
  others?: any;
  country?: string;
  description?: string;
  disabled?: boolean;
  regex?: RegExp;
  loadingID?: string;
  loadingRequired?: boolean;
  defaultDate?: any;
  selectionKey?: string;
  selected?: any;
  searchable?: boolean;
  defaultValue?: any;
  remainingValue?: number;
  totalValue?: number;
  content?: any;
  configurations?: any;
  portRange?: boolean;
  enabledProviders?: (values: any) => object[];
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
