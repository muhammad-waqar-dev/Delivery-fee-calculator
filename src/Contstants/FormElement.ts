import dayjs from "dayjs";
import {
  IFormInitialValues,
} from "../Components/Delivery/DeliveryInterface";
import { FormCreationData } from "../GenericForm/GenericFormInterface";

export const formElementTypes = {
  NUMBER: "number",
  DATETIME: "dateTime"
}

export const formElements: FormCreationData[] = [
  {
    label: "Cart Value(EUR)",
    name: "cartValue",
    type: "number",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true
  },
  {
    label: "Delivery Distance(m)",
    name: "deliveryDistance",
    type: "number",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true
  },
  {
    label: "Number of Item(s)",
    name: "noOfItems",
    type: "number",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true
  },
  {
    label: "Date Time",
    name: "dateTime",
    type: "dateTime",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true
  },
];

export const initialValues: IFormInitialValues = {
  cartValue: undefined,
  deliveryDistance: undefined,
  noOfItems: undefined,
  dateTime: dayjs(),
};