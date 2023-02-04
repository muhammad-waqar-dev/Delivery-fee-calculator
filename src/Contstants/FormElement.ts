import dayjs from "dayjs";
import { IDeliveryFormElement, IFormInitialValues } from "../Components/Delivery/DeliveryInterface";

export const formElements:IDeliveryFormElement[] = [
    {
      label: "Cart Value(EUR)",
      name: "cartValue",
      type: "number"
    },
    {
      label: "Delivery Distance(m)",
      name: "deliveryDistance",
      type: "number"
    },
    {
      label: "Number of Item(s)",
      name: "noOfItems",
      type: "number"
    },
    {
      label: "Date Time",
      name: "dateTime",
      type: "dateTime"
    },
  ];


  export const initialValues:IFormInitialValues = {
    cartValue: undefined,
    deliveryDistance: undefined,
    noOfItems: undefined,
    dateTime: dayjs()
  };