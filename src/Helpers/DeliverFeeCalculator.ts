import { IFindDeloveryFeeProps, IFindDeloveryFeeResult } from "./DeliverFeeCalculatorInterface";

export const findDeloveryFee = (props: IFindDeloveryFeeProps) => {
  const { cardValueInEuro, deliveryDistanceInMeter, noOfItems, time } = props;
  let surchargeFee = 0;
  let distanceInMeterFee = 0;
  let baseFee = 2;
  let extraBulkFee = 120;
  let extraBulkSurchargeFee = 0.5;
  let deliveryFeeInEuro = 0;
  let timeInHours = time?.hour();

  if (cardValueInEuro >= 100) {

    let result: IFindDeloveryFeeResult = {
      fee: deliveryFeeInEuro,
      status: true,
      message: "Card value greater than 100"
    }

    return result;
  }

  if (cardValueInEuro < 10) {
    surchargeFee = 10 - cardValueInEuro;
  }

  if (deliveryDistanceInMeter > 0) {
    // distance between 1 to 1000
    if (deliveryDistanceInMeter <= 1000) {
      distanceInMeterFee = baseFee;
    } else {
      // distance above 1001
      distanceInMeterFee = Math.ceil(deliveryDistanceInMeter / 500);
    }
  }

  if (noOfItems > 0) {
    if (noOfItems < 5) {
      surchargeFee = surchargeFee + 0;
    } else if (noOfItems >= 5 && noOfItems <= 11) {
      let extraBulkSurcharge = (noOfItems - 4) * extraBulkSurchargeFee;
      surchargeFee = surchargeFee + extraBulkSurcharge;
    } else {
      let extraBulkSurcharge = (noOfItems - 4) * extraBulkSurchargeFee;
      surchargeFee = surchargeFee + extraBulkSurcharge + extraBulkFee;
    }
  }

  deliveryFeeInEuro = distanceInMeterFee + surchargeFee;

  //rush hours
  if (timeInHours >= 15 && timeInHours <= 19) {
    deliveryFeeInEuro = deliveryFeeInEuro * 1.2;
  }

  if (deliveryFeeInEuro > 15) {
    //delivery fee never greate than 15 euro

    let result: IFindDeloveryFeeResult = {
      fee: deliveryFeeInEuro,
      status: false,
      message: "Delivery fee never greate than 15 euro"
    }
    return result;
    
  }

  let result: IFindDeloveryFeeResult = {
    fee: deliveryFeeInEuro,
    status: true,
    message: "Delivery fee calculated successfully"
  }


  return result;
};
