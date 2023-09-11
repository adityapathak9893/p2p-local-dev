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

export const getFormattedDate = (inputDate: string) => {
  const date = new Date(inputDate);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
};
