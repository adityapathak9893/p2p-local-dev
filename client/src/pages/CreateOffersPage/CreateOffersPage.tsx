import { Button, Divider, SelectChangeEvent, Typography } from "@mui/material";
import React from "react";
import { StepperComponent } from "../../components/StepperComponent";
import { StepsContent } from "../../models/interfaces";
import {
  getOtherSettingsStepsForm,
  getPaymentMethodStepForm,
  getPricingStepForm,
  getStepsSummaryWithPoints,
} from "./CreateOffersPage.helper";
import "./CreateOffersPage.scss";
import {
  step1Summary,
  step2Summary,
  step3Summary,
  steps,
} from "./CreateOffersPage.utils";
import { useActionDispatch, useStateSelector } from "../../hooks";

export const CreateOffersPage: React.FC = () => {
  const { placeMyBuyOffer, placeMySellOffer } = useActionDispatch();

  const [activeStep, setActiveStep] = React.useState(0);

  /* local states for 1st step*/
  const [cryptoCurrency, setCryptoCurrency] = React.useState("Bitcoin");
  const [buySellOffer, setBuySellOffer] = React.useState("Buy");
  const [paymentMethod, setPaymentMethod] = React.useState("Paypal");
  const [preferredCurrency, setPreferredCurrency] = React.useState("USD");

  /* local states for 2nd step*/
  const [cryptoCurrencyRate, setCryptoCurrencyRate] =
    React.useState("Market price");
  const [minOfferTradeLimit, setMinOfferTradeLimit] = React.useState(250);
  const [maxOfferTradeLimit, setMaxOfferTradeLimit] = React.useState(350);
  const [offerMargin, setOfferMargin] = React.useState(5);
  //const [offerTimeLimit, setOfferTimeLimit] = React.useState(30);

  /* local states for 3rd step*/
  const [offersTags, setOffersTags] = React.useState<string[]>([]);
  const [offerLocation, setOfferLocation] = React.useState("USA");
  const [offerOwnerLocation, setOfferOwnerLocation] = React.useState("USA");

  /* handles for Next/previous step */

  const handleNext = (activatedButton: string) => {
    if (activatedButton === "Create an offer") {
      if (buySellOffer === "Buy") {
        placeMyBuyOffer(
          cryptoCurrency,
          paymentMethod,
          preferredCurrency,
          cryptoCurrencyRate,
          minOfferTradeLimit,
          maxOfferTradeLimit,
          offerMargin,
          offersTags,
          offerLocation,
          offerOwnerLocation
        );
      } else {
        placeMySellOffer(
          cryptoCurrency,
          paymentMethod,
          preferredCurrency,
          cryptoCurrencyRate,
          minOfferTradeLimit,
          maxOfferTradeLimit,
          offerMargin,
          offersTags,
          offerLocation,
          offerOwnerLocation
        );
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  /* handles for 1st step */

  const handleChangeCryptoCurrency = (event: SelectChangeEvent) => {
    setCryptoCurrency(event.target.value);
  };

  const handleChangeBuySellOffer = (event: SelectChangeEvent) => {
    setBuySellOffer(event.target.value);
  };
  const handleChangePaymentMethod = (event: SelectChangeEvent) => {
    setPaymentMethod(event.target.value);
  };

  const handleChangePreferredCurrency = (event: SelectChangeEvent) => {
    setPreferredCurrency(event.target.value);
  };

  /* handles for 2nd step */

  const handleCryptoCurrencyRate = (event: SelectChangeEvent) => {
    setCryptoCurrencyRate(event.target.value);
  };

  const handleChangeMinOfferTradeLimit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinOfferTradeLimit(Number(event.target.value));
  };
  const handleChangeMaxOfferTradeLimit = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxOfferTradeLimit(Number(event.target.value));
  };

  const handleChangeOfferMargin = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOfferMargin(Number(event.target.value));
  };

  //handles for 3rd step

  const handleChangeOfferLocation = (event: SelectChangeEvent) => {
    setOfferLocation(event.target.value);
  };

  const handleChangeOfferOwnerLocation = (event: SelectChangeEvent) => {
    setOfferOwnerLocation(event.target.value);
  };

  const stepsContent: StepsContent = {
    PaymentMethod: [
      getPaymentMethodStepForm(
        cryptoCurrency,
        buySellOffer,
        paymentMethod,
        preferredCurrency,
        handleChangeCryptoCurrency,
        handleChangeBuySellOffer,
        handleChangePaymentMethod,
        handleChangePreferredCurrency
      ),
      getStepsSummaryWithPoints(step1Summary, [
        `You want to ${buySellOffer} ${cryptoCurrency}`,
        `And ${
          buySellOffer === "Buy" ? "pay for it" : "get paid"
        } via ${paymentMethod} in ${preferredCurrency}`,
      ]),
    ],
    Pricing: [
      getPricingStepForm(
        cryptoCurrency,
        preferredCurrency,
        cryptoCurrencyRate,
        minOfferTradeLimit,
        maxOfferTradeLimit,
        offerMargin,
        handleCryptoCurrencyRate,
        handleChangeMinOfferTradeLimit,
        handleChangeMaxOfferTradeLimit,
        handleChangeOfferMargin
      ),
      getStepsSummaryWithPoints(step2Summary, [
        `You will make a profit of ${offerMargin}% on every trade`,
        `People can trade between ${minOfferTradeLimit} and ${maxOfferTradeLimit} ${preferredCurrency}`,
      ]),
    ],
    OtherSettings: [
      getOtherSettingsStepsForm(
        offersTags,
        setOffersTags,
        offerLocation,
        offerOwnerLocation,
        handleChangeOfferLocation,
        handleChangeOfferOwnerLocation
      ),
      getStepsSummaryWithPoints(step3Summary, [
        `Your preferred offer tags are ${offersTags.map(
          (offerTag, index) => `"${offerTag}"`
        )}`,
        `Your offer location is ${offerLocation}`,
        `Your location is ${offerOwnerLocation}`,
      ]),
    ],
  };

  const activeStepKey = steps.filter((step) => activeStep === step.index)[0]
    .stepKey;

  return (
    <div className="createOffersPageContainer">
      <div className="offerProcessSection">
        <div className="stepperContainer">
          <StepperComponent activeStep={activeStep} steps={steps} />
        </div>
        <div className="offerProcessFormContainer">
          {activeStep === steps.length ? (
            <div>
              <Typography>All steps completed</Typography>
            </div>
          ) : (
            (stepsContent as any)[activeStepKey][0]
          )}
        </div>
      </div>
      <Divider orientation="vertical" flexItem />
      <div className="stepsSummarySection">
        <h2 className="stepsSummarySectionTitle">About This Step</h2>
        {(stepsContent as any)[activeStepKey][1]}
        <div className="stepsSummarybuttonContainer">
          <div className="stepsSummaryButtons">
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
          </div>
          <div className="stepsSummaryButtons">
            <Button
              variant="contained"
              color="primary"
              onClick={() =>
                handleNext(
                  activeStep === steps.length - 1 ? "Create an offer" : "Next"
                )
              }
            >
              {activeStep === steps.length - 1 ? "Create an offer" : "Next"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
