import { Dayjs } from "dayjs";

export interface IFindDeloveryFeeProps {
     cardValueInEuro: number;
     deliveryDistanceInMeter: number;
     noOfItems: number;
     time: Dayjs; //I used dayjs type but it's will be changed to default  Date
  }

 export interface IFindDeloveryFeeResult {
   fee: number;
   status: boolean;
   message: string;
 }