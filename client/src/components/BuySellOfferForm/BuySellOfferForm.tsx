import React, { useEffect, useState } from "react";
import { useActionDispatch, useStateSelector } from "../../hooks";
import "./BuySellOfferForm.scss";
import { useNavigate } from "react-router";

export const BuySellOfferForm: React.FC = () => {
  const [cryptoCurrency, setCryptoCurrency] = useState("Bitcoin");
  const [paymentMethod, setPaymentMethod] = useState("Bank");
  const [preferredCurrency, setPreferredCurrency] = useState("USD");
  const [money, setMoney] = useState("250");
  const [offerLocation, setOfferLocation] = useState("");
  const [offerOwnerLocation, setOfferOwnerLocation] = useState("");
  const [tradeMode, setTradeMode] = useState("BUY");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { getSellOffersWithFilters, getBuyOffersWithFilters } =
    useActionDispatch();
  const navigate = useNavigate();

  const handleCryptoCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newCryptoCurrency = e.target.value;
    setCryptoCurrency(newCryptoCurrency);
    validateForm({
      ...errors,
      cryptoCurrency: validateCryptoCurrency(newCryptoCurrency),
    });
  };

  const handlePreferredCurrencyChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPreferredCurrency = e.target.value;
    setPreferredCurrency(newPreferredCurrency);
    validateForm({
      ...errors,
      preferredCurrency: validatePreferredCurrency(newPreferredCurrency),
    });
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newPaymentMethod = e.target.value;
    setPaymentMethod(newPaymentMethod);
    validateForm({
      ...errors,
      paymentMethod: validatePaymentMethod(newPaymentMethod),
    });
  };

  const handleMoneyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMoney = e.target.value;
    setMoney(newMoney);
    validateForm({ ...errors, money: validateMoney(newMoney) });
  };

  const handleOfferLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newOfferLocation = e.target.value;
    setOfferLocation(newOfferLocation);
    validateForm({
      ...errors,
      offerLocation: validateOfferLocation(newOfferLocation),
    });
  };

  const handleOfferOwnerLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newOfferOwnerLocation = e.target.value;
    setOfferOwnerLocation(newOfferOwnerLocation);
    validateForm({
      ...errors,
      offerOwnerLocation: validateOfferOwnerLocation(newOfferOwnerLocation),
    });
  };

  const validateForm = (formErrors: { [key: string]: string }) => {
    setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => error === ""));
  };

  const validateCryptoCurrency = (cryptoCurrency: string) => {
    return cryptoCurrency ? "" : "Crypto currency is required ";
  };

  const validatePreferredCurrency = (preferredCurrency: string) => {
    return preferredCurrency ? "" : "preferred currency is required";
  };

  const validatePaymentMethod = (paymentMethod: string) => {
    return paymentMethod ? "" : "Payment method is required";
  };

  const validateMoney = (money: string) => {
    return money ? "" : "This field is required";
  };

  const validateOfferLocation = (offerLocation: string) => {
    return offerLocation ? "" : "Offer location is required";
  };

  const validateOfferOwnerLocation = (offerOwnerLocation: string) => {
    return offerOwnerLocation ? "" : "Offer owner location is required";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      if (tradeMode === "BUY") {
        navigate("/buy");
        getSellOffersWithFilters(
          cryptoCurrency,
          Number(money),
          preferredCurrency,
          paymentMethod,
          offerLocation,
          offerOwnerLocation
        );
      } else {
        navigate("/sell");
        getBuyOffersWithFilters(
          cryptoCurrency,
          Number(money),
          preferredCurrency,
          paymentMethod,
          offerLocation,
          offerOwnerLocation
        );
      }
    }
  };

  const handleBuySell = (buttonToBeActivated: string) => {
    setTradeMode(buttonToBeActivated);
  };

  useEffect(() => {
    setErrors({
      cryptoCurrency: "",
      paymentMethod: "",
      preferredCurrency: "",
      money: "",
      offerLocation: "",
      offerOwnerLocation: "",
    });
  }, []);

  useEffect(() => {
    const validity =
      cryptoCurrency &&
      paymentMethod &&
      money &&
      offerLocation &&
      offerOwnerLocation &&
      Object.values(errors).every((error) => error === "");
    setIsFormValid(validity === "" ? false : validity);
  }, [
    cryptoCurrency,
    paymentMethod,
    money,
    offerLocation,
    offerOwnerLocation,
    errors,
  ]);

  return (
    <div className="buySell-container">
      <div className="buySellButtonWrapper">
        <button
          className={
            tradeMode === "BUY"
              ? " buy-button activeButton"
              : " buy-button deActiveButton"
          }
          onClick={() => handleBuySell("BUY")}
        >
          Buy
        </button>
        <button
          className={
            tradeMode === "SELL"
              ? " sell-button activeButton"
              : "sell-button deActiveButton"
          }
          onClick={() => handleBuySell("SELL")}
        >
          Sell
        </button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="buySell-form-group">
          <label>Crypto Currency</label>
          <select
            value={cryptoCurrency}
            onChange={handleCryptoCurrencyChange}
            className={
              errors.cryptoCurrency ? "buySell-error" : "buySell-selectField"
            }
          >
            <option value="">Select payment method</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Ethereum">Ethereum</option>
            <option value="USDT">USDT</option>
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
            <option value="Paypal">Paypal</option>
            <option value="Bank">Bank</option>
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
            <option value="">Select Currency</option>
            <option value="USD">USD</option>
            <option value="EURO">EURO</option>
            <option value="AUD">AUD</option>
            <option value="CAD">CAD</option>
            <option value="HKD">HKD</option>
            <option value="SGD">SGD</option>
            <option value="TWD">TWD</option>
          </select>
          {errors.preferredCurrency && (
            <span className="buySell-error-message">
              {errors.preferredCurrency}
            </span>
          )}
        </div>
        <div className="buySell-form-group">
          <label>
            {tradeMode === "BUY" ? "I want to spend" : "I want to get"}
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
        <div className="buySell-form-group">
          <label>Offer location</label>
          <select
            value={offerLocation}
            onChange={handleOfferLocationChange}
            className={errors.money ? "buySell-error" : "buySell-selectField"}
          >
            <option value="">Select location</option>
            <option value="USA">USA</option>
            <option value="GERMANY">GERMANY</option>
          </select>
          {errors.money && (
            <span className="buySell-error-message">{errors.money}</span>
          )}
        </div>
        <div className="buySell-form-group">
          <label>Offer Owner location</label>
          <select
            value={offerOwnerLocation}
            onChange={handleOfferOwnerLocationChange}
            className={
              errors.offerOwnerLocation
                ? "buySell-error"
                : "buySell-selectField"
            }
          >
            <option value="">Select location</option>
            <option value="USA">USA</option>
            <option value="GERMANY">GERMANY</option>
          </select>
          {errors.offerOwnerLocation && (
            <span className="buySell-error-message">
              {errors.offerOwnerLocation}
            </span>
          )}
        </div>
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
