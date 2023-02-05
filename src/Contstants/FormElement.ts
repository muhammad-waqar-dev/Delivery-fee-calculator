import dayjs from "dayjs";
import {
  IDeliveryFormElement,
  IFormInitialValues,
} from "../Components/Delivery/DeliveryInterface";
import { FormCreationData } from "../GenericForm/GenericFormInterface";

export const formElementTypes = {
  NUMBER: "number",
  DATETIME: "dateTime"
}

export const formElements1: IDeliveryFormElement[] = [
  {
    label: "Cart Value(EUR)",
    name: "cartValue",
    type: "number",
  },
  {
    label: "Delivery Distance(m)",
    name: "deliveryDistance",
    type: "number",
  },
  {
    label: "Number of Item(s)",
    name: "noOfItems",
    type: "number",
  },
  {
    label: "Date Time",
    name: "dateTime",
    type: "dateTime",
  },
];

export const formElements: FormCreationData[] = [
  {
    label: "Cart Value(EUR)",
    name: "cartValue",
    type: "number",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true,
    visibility: () => true,
    // toolTipText: "hello",
    // description: "world1",
    // disabled: false,
    // helperText: "world ggg",
  },
  {
    label: "Delivery Distance(m)",
    name: "deliveryDistance",
    type: "number",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true,
    visibility: () => true,
    // toolTipText: "hello",
    // description: "world1",
    // disabled: false,
    // helperText: "world ggg",
  },
  {
    label: "Number of Item(s)",
    name: "noOfItems",
    type: "number",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true,
    visibility: () => true,
    // toolTipText: "hello",
    // description: "world1",
    // disabled: false,
    // helperText: "world ggg",
  },
  {
    label: "Date Time",
    name: "dateTime",
    type: "dateTime",
    placeholderText: "Please enter cart value",
    inputLabelShrink: true,
    visibility: () => true,
    // toolTipText: "hello",
    // description: "world1",
    // disabled: false,
    // helperText: "world ggg",
  },
];

export const initialValues: IFormInitialValues = {
  cartValue: undefined,
  deliveryDistance: undefined,
  noOfItems: undefined,
  dateTime: dayjs(),
};