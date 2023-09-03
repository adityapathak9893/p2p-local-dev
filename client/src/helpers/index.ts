import { FIATCURRENCIES } from "../models/constants";

export const getMinAmountValidationByCurrency = (
  currency: string,
  amount: string
) => {
  const formattedAmount = Number(amount);
  const currencyDetail = FIATCURRENCIES.filter(
    (currencyDetails) => currencyDetails.key === currency
  )[0];
  return currency === ""
    ? "Please select your preferred currency first"
    : Number.isNaN(formattedAmount)
    ? "Please enter a number value only"
    : formattedAmount >= currencyDetail.minAmount
    ? ""
    : `You need to enter min of ${currencyDetail.minAmount} ${currencyDetail.label}`;
};
