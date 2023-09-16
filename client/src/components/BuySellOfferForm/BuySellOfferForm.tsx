import React, { useEffect } from "react";
import { getMinAmountValidationByCurrency } from "../../helpers";
import {
  BUY,
  COUNTRIES,
  CRYPTOCURRENCY,
  FIATCURRENCIES,
  PAYMENTMETHODS,
  SELL,
} from "../../models/constants";
import { OfferFormDetails } from "../../models/interfaces";
import "./BuySellOfferForm.scss";

interface IBuySellOfferForm {
  offerFormDetails: OfferFormDetails;
  tradeMode: string;
  showBuySellButtons: boolean;
  setTradeMode: (tradeMode: string) => void;
  setOfferForm: (offerFormDetails: OfferFormDetails) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isHomePageActive: boolean;
}

export const BuySellOfferForm: React.FC<IBuySellOfferForm> = ({
  offerFormDetails,
  tradeMode,
  showBuySellButtons,
  setTradeMode,
  setOfferForm,
  onSubmit,
  isHomePageActive,
}) => {
  const {
    cryptoCurrency,
    paymentMethod,
    preferredCurrency,
    money,
    location,
    errors,
    isFormValid,
  } = offerFormDetails;

  const handleCryptoCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCryptoCurrency = e.target.value;
    setOfferForm({ ...offerFormDetails, cryptoCurrency: newCryptoCurrency });
  };

  const handlePreferredCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPreferredCurrency = e.target.value;
    setOfferForm({
      ...offerFormDetails,
      preferredCurrency: newPreferredCurrency,
    });
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPaymentMethod = e.target.value;
    setOfferForm({ ...offerFormDetails, paymentMethod: newPaymentMethod });
  };

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMoney = e.target.value;
    const formErrors = {
      ...errors,
      money: getMinAmountValidationByCurrency(preferredCurrency, newMoney),
    };
    setOfferForm({
      ...offerFormDetails,
      money: newMoney,
      errors: formErrors,
      isFormValid: Object.values(formErrors).every((error) => error === ""),
    });
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = e.target.value;
    setOfferForm({
      ...offerFormDetails,
      location: newLocation,
    });
  };

  const handleBuySell = (buttonToBeActivated: string) => {
    setTradeMode(buttonToBeActivated);
  };

  useEffect(() => {
    setOfferForm({
      ...offerFormDetails,
      errors: {
        cryptoCurrency: "",
        paymentMethod: "",
        preferredCurrency: "",
        money: "",
        location: "",
      },
    });
  }, []);

  useEffect(() => {
    const validity =
      cryptoCurrency && Object.values(errors).every((error) => error === "");
    setOfferForm({
      ...offerFormDetails,
      isFormValid: validity === "" ? false : validity,
    });
  }, [cryptoCurrency, paymentMethod, money, location, errors, tradeMode]);

  return (
    <div className="buySell-container">
      {showBuySellButtons && (
        <div className="buySellButtonWrapper">
          <button
            className={
              tradeMode === BUY
                ? " buy-button activeButton"
                : " buy-button deActiveButton"
            }
            onClick={() => handleBuySell(BUY)}
          >
            Buy
          </button>
          <button
            className={
              tradeMode === SELL
                ? " sell-button activeButton"
                : "sell-button deActiveButton"
            }
            onClick={() => handleBuySell(SELL)}
          >
            Sell
          </button>
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="buySell-form-group">
          <label>Crypto Currency</label>
          <select
            value={cryptoCurrency}
            onChange={handleCryptoCurrencyChange}
            className={
              errors.cryptoCurrency ? "buySell-error" : "buySell-selectField"
            }
          >
            <option value="">Select crypto currency</option>
            <option value={CRYPTOCURRENCY}>{CRYPTOCURRENCY}</option>
          </select>
          {errors.cryptoCurrency && (
            <span className="buySell-error-message">
              {errors.cryptoCurrency}
            </span>
          )}
        </div>
        <div className="buySell-form-group">
          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className={
              errors.paymentMethod ? "buySell-error" : "buySell-selectField"
            }
          >
            <option value="">Select payment method</option>
            {PAYMENTMETHODS.map((paymentMethod) => (
              <option value={paymentMethod}>{paymentMethod}</option>
            ))}
          </select>
          {errors.paymentMethod && (
            <span className="buySell-error-message">
              {errors.paymentMethod}
            </span>
          )}
        </div>
        <div className="buySell-form-group">
          <label>Preferred Currency</label>
          <select
            value={preferredCurrency}
            onChange={handlePreferredCurrencyChange}
            className={
              errors.preferredCurrency ? "buySell-error" : "buySell-selectField"
            }
          >
            <option value="">Select your preferred currency</option>
            {FIATCURRENCIES.map((currencyDetails) => (
              <option value={currencyDetails.key}>
                {currencyDetails.label}
              </option>
            ))}
          </select>
          {errors.preferredCurrency && (
            <span className="buySell-error-message">
              {errors.preferredCurrency}
            </span>
          )}
        </div>
        <div className="buySell-form-group">
          <label>
            {tradeMode === BUY ? "I want to spend" : "I want to get"}
          </label>
          <input
            type="text"
            value={money}
            onChange={handleMoneyChange}
            className={errors.money ? "buySell-error" : "buySell-input"}
          />
          {errors.money && (
            <span className="buySell-error-message">{errors.money}</span>
          )}
        </div>
        {isHomePageActive && (
          <>
            <div className="buySell-form-group">
              <label>Location</label>
              <select
                value={location}
                onChange={handleLocationChange}
                className={
                  errors.location ? "buySell-error" : "buySell-selectField"
                }
              >
                <option value="">Select location</option>
                {COUNTRIES.map((country) => (
                  <option value={country}>{country}</option>
                ))}
              </select>
              {errors.location && (
                <span className="buySell-error-message">{errors.location}</span>
              )}
            </div>
          </>
        )}
        <button
          className="findOffersSubmit"
          type="submit"
          disabled={!isFormValid}
        >
          Find Offers
        </button>
      </form>
    </div>
  );
};
