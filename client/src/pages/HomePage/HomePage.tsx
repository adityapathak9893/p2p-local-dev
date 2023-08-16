import React from "react";
import "./HomePage.scss";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";

export const HomePage: React.FC = () => {
  return (
    <div id="HomePageContainer">
      <div className="buySellContainerWrapper">
        <BuySellOfferForm />
      </div>
    </div>
  );
};
