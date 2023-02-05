import { Dayjs } from "dayjs";

export interface IFormInitialValues {
  cartValue: undefined | number;
  deliveryDistance: undefined | number;
  noOfItems: undefined | number;
  dateTime: Dayjs;
}
