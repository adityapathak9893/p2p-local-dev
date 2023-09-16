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

export const stringToColor = (string: string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name: string, width: number, height: number) => {
  const parts = name.split(/[^a-zA-Z0-9]/);
  const filteredParts = parts.filter((part) => part.length > 0);
  const initials = filteredParts.map((part) => part[0]);
  const result = initials.join("");
  return {
    sx: {
      bgcolor: stringToColor(name),
      width: width,
      height: height,
    },
    children: result,
  };
};
