import React from "react";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { BUY } from "../../models/constants";
import { OfferFormDetails } from "../../models/interfaces";
import { useNavigate } from "react-router";
import "./HomePage.scss";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const { setBuyOfferFormDetails, setSellOfferFormDetails, setTradeMode } =
    useActionDispatch();
  const { buyOfferFormDetails, sellOfferFormDetails, tradeMode } =
    useStateSelector();

  const offerFormDetails =
    tradeMode === BUY ? buyOfferFormDetails : sellOfferFormDetails;

  const { isFormValid } = offerFormDetails;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      if (tradeMode === BUY) {
        navigate("/buy-from");
      } else {
        navigate("/sell-to");
      }
    }
  };

  return (
    <div id="HomePageContainer">
      <div className="buySellContainerWrapper">
        <BuySellOfferForm
          offerFormDetails={offerFormDetails}
          tradeMode={tradeMode}
          showBuySellButtons
          setTradeMode={(tradeMode: string) => {
            setTradeMode(tradeMode);
          }}
          setOfferForm={(offerFormDetails: OfferFormDetails) => {
            tradeMode === BUY
              ? setBuyOfferFormDetails(offerFormDetails)
              : setSellOfferFormDetails(offerFormDetails);
          }}
          onSubmit={onSubmit}
          isHomePageActive={false}
        />
      </div>
    </div>
  );
};
