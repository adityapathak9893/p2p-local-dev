import React, { useEffect, useState } from "react";
import { useActionDispatch, useStateSelector } from "../../hooks";
import "./BuySellOfferForm.scss";

export const BuySellOfferForm: React.FC = () => {
  const [cryptoCurrency, setCryptoCurrency] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [money, setMoney] = useState("");
  const [offerLocation, setOfferLocation] = useState("");
  const [offerOwnerLocation, setOfferOwnerLocation] = useState("");
  const [tradeMode, setTradeMode] = useState("BUY");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { doUserSignUp } = useActionDispatch();
  const { userSignUpInfo } = useStateSelector();

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
    validateForm({ ...errors, email: validateMoney(newMoney) });
  };

  const handleOfferLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newOfferLocation = e.target.value;
    setOfferLocation(newOfferLocation);
    validateForm({
      ...errors,
      password: validateOfferLocation(newOfferLocation),
    });
  };

  const handleOfferOwnerLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newOfferOwnerLocation = e.target.value;
    setOfferOwnerLocation(newOfferOwnerLocation);
    validateForm({
      ...errors,
      password: validateOfferOwnerLocation(newOfferOwnerLocation),
    });
  };

  const validateForm = (formErrors: { [key: string]: string }) => {
    setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => error === ""));
  };

  const validateCryptoCurrency = (cryptoCurrency: string) => {
    // Implement validation logic for country code here
    return cryptoCurrency ? "" : "Crypto currency is required ";
  };

  const validatePaymentMethod = (paymentMethod: string) => {
    // Implement email validation logic here
    return paymentMethod ? "" : "Payment method is required";
  };

  const validateMoney = (money: string) => {
    // Implement password validation logic here
    return money ? "" : "This field is required";
  };

  const validateOfferLocation = (offerLocation: string) => {
    // Implement password validation logic here
    return offerLocation ? "" : "Offer location is required";
  };

  const validateOfferOwnerLocation = (offerOwnerLocation: string) => {
    // Implement password validation logic here
    return offerOwnerLocation ? "" : "Offer owner location is required";
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      // Perform signup logic here
    }
  };

  const handleBuySell = (buttonToBeActivated: string) => {
    setTradeMode(buttonToBeActivated);
  };

  useEffect(() => {
    setErrors({
      cryptoCurrency: "",
      paymentMethod: "",
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
            <option value="">Select Crypto Currency</option>
            <option value="Bitcoin">Bitcoin</option>
            <option value="Tether">Tether</option>
            <option value="USDCoin">USDCoin</option>
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
            <option value="PayTM">PayTM</option>
            <option value="PhonePe">PhonePe</option>
          </select>
          {errors.paymentMethod && (
            <span className="buySell-error-message">
              {errors.paymentMethod}
            </span>
          )}
        </div>
        <div className="buySell-form-group">
          <label>
            {tradeMode === "BUY"
              ? "I want to spend (Curreny in USD)"
              : "I want to get (Curreny in USD)"}
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
