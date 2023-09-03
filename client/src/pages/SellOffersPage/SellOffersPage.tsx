import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { ListItems } from "../../components/ListItems";
import { useStateSelector, useActionDispatch } from "../../hooks";
import { OfferFormDetails } from "../../models/interfaces";
import { BUY } from "../../models/constants";

export const SellOffersPage: React.FC = () => {
  const { setBuyOfferFormDetails, setTradeMode, getSellOffersWithFilters } =
    useActionDispatch();
  const { buyOfferFormDetails, tradeMode, allSellOfferDetails } =
    useStateSelector();

  const {
    cryptoCurrency,
    paymentMethod,
    preferredCurrency,
    money,
    offerLocation,
    offerOwnerLocation,
    isFormValid,
  } = buyOfferFormDetails;

  useEffect(() => {
    setTradeMode(BUY);
    getSellOffersWithFilters(
      cryptoCurrency,
      Number(money),
      preferredCurrency,
      paymentMethod,
      offerLocation,
      offerOwnerLocation
    );
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      getSellOffersWithFilters(
        cryptoCurrency,
        Number(money),
        preferredCurrency,
        paymentMethod,
        offerLocation,
        offerOwnerLocation
      );
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
        }}
      >
        <BuySellOfferForm
          offerFormDetails={buyOfferFormDetails}
          tradeMode={tradeMode}
          showBuySellButtons={false}
          setTradeMode={(tradeMode: string) => {
            setTradeMode(tradeMode);
          }}
          setOfferForm={(offerFormDetails: OfferFormDetails) => {
            setBuyOfferFormDetails(offerFormDetails);
          }}
          onSubmit={onSubmit}
          isHomePageActive
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "10px",
          flex: 3,
        }}
      >
        {!!allSellOfferDetails.length ? (
          <ListItems offersList={allSellOfferDetails} isBuyOffer={false} />
        ) : (
          "There are currently no sell offers available for your criteria!"
        )}
      </Box>
    </Box>
  );
};
