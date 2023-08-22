export const steps: {
  index: number;
  stepKey: string;
  label: string;
}[] = [
  { index: 0, stepKey: "PaymentMethod", label: "Payment Method" },
  { index: 1, stepKey: "Pricing", label: "Pricing" },
  { index: 2, stepKey: "OtherSettings", label: "Other Settings" },
];

export const step1Summary: string =
  "Start creating your offer by selecting the cryptocurrency you want to trade, whether or not you want to buy or sell, and the payment method you want to use.";

export const step2Summary: string =
  "Decide the price you want to trade at, and set the limits for your offer.";

export const step3Summary: string =
  "Set the terms, instructions, and limitations for people to trade on this offer.";
