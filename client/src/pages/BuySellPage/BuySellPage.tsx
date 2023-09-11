import React from "react";
import { BuyBitcoins } from "../../components/BuyBitcoins";
import { useLocation } from "react-router-dom";
import { SellBitcoins } from "../../components/SellBitcoins";

export const BuySellPage: React.FC = () => {
  const location = useLocation();
  const state = location.state;
  const { email, userName, isBuyOffer } = state;
  return isBuyOffer ? (
    <BuyBitcoins email={email} userName={userName} />
  ) : (
    <SellBitcoins email={email} userName={userName} />
  );
};
