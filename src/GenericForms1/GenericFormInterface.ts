export interface FormCreationData {
  items?: SelectionMenu[];
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
}

export interface SelectionMenu {
  name: string;
  id: string;
  value?: string;
  colorCode?: string;
  thumbnail?: string;
  type?: string;
}

export interface GraphColors {
  name: string;
  id: string;
  value: string;
}

export interface FormData {
  name: string | undefined;
  handleFormSubmit: (values: any, actions?: any) => void;
  handleVerifySubmit?: (values: any, actions?: any) => void;
  formElements: FormCreationData[];
  initialValues?: any;
  visibilitySubmitBtn?: boolean;
  hideHeader?: boolean;
  id?: any;
  validationSchema: any;
  submitText?: any;
  headerVisiblity?: any;
  radioDefault?: any;
  submitButtonDetails?: Object;
}
