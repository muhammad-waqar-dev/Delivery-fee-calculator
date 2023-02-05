import { Dayjs } from "dayjs";

export interface IDeliveryFormElement {
  label: string;
  name: string;
  type: string;
}

export interface IFormInitialValues {
  cartValue: undefined | number;
  deliveryDistance: undefined | number;
  noOfItems: undefined | number;
  dateTime: Dayjs;
}
