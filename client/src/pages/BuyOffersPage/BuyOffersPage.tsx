import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { ListItems } from "../../components/ListItems";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { OfferFormDetails } from "../../models/interfaces";
import { SELL } from "../../models/constants";
import { isJSDocFunctionType } from "typescript";

export const BuyOffersPage: React.FC = () => {
  const { setSellOfferFormDetails, setTradeMode, getBuyOffersWithFilters } =
    useActionDispatch();
  const { sellOfferFormDetails, tradeMode, allBuyOfferDetails } =
    useStateSelector();

  const {
    cryptoCurrency,
    paymentMethod,
    preferredCurrency,
    money,
    offerLocation,
    offerOwnerLocation,
    isFormValid,
  } = sellOfferFormDetails;

  useEffect(() => {
    setTradeMode(SELL);
    getBuyOffersWithFilters(
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
      getBuyOffersWithFilters(
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
          offerFormDetails={sellOfferFormDetails}
          tradeMode={tradeMode}
          showBuySellButtons={false}
          setTradeMode={(tradeMode: string) => {
            setTradeMode(tradeMode);
          }}
          setOfferForm={(offerFormDetails: OfferFormDetails) => {
            setSellOfferFormDetails(offerFormDetails);
          }}
          onSubmit={onSubmit}
          isHomePageActive
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          padding: "0px 20px",
          flexDirection: "column",
          flex: 3,
        }}
      >
        {!!allBuyOfferDetails.length ? (
          <ListItems offersList={allBuyOfferDetails} isBuyOffer={false} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography variant="h5" sx={{ color: "white" }}>
              There are currently no buy offers available for the applied
              filters!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
