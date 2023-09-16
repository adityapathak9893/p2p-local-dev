import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { ListItems } from "../../components/ListItems";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { OfferFormDetails } from "../../models/interfaces";
import { SELL } from "../../models/constants";

export const BuyOffersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setSellOfferFormDetails, setTradeMode, getBuyOffersWithFilters } =
    useActionDispatch();
  const {
    sellOfferFormDetails,
    tradeMode,
    allBuyOfferDetails,
    isUserLoggedIn,
  } = useStateSelector();

  const {
    cryptoCurrency,
    paymentMethod,
    preferredCurrency,
    money,
    location,
    isFormValid,
  } = sellOfferFormDetails;

  useEffect(() => {
    // Fetch data for the initial page (page 1)
    fetchData(currentPage);
  }, [currentPage]); // Fetch data whenever the page number changes

  const fetchData = (page: number) => {
    //setTradeMode to SELL
    setTradeMode(SELL);
    // Make an API request with the updated page parameter
    getBuyOffersWithFilters(
      cryptoCurrency,
      Number(money),
      preferredCurrency,
      paymentMethod,
      location,
      page // Pass the current page number
    );
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      // Reset the current page to 1 before fetching data
      setCurrentPage(1);
      getBuyOffersWithFilters(
        cryptoCurrency,
        Number(money),
        preferredCurrency,
        paymentMethod,
        location,
        currentPage
      );
    }
  };

  const handleLoadMoreClick = () => {
    setCurrentPage(currentPage + 1);
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
          <>
            <ListItems
              offersList={allBuyOfferDetails}
              isBuyOffer={false}
              isButtonDisabled={!isUserLoggedIn}
            />
            <Button onClick={handleLoadMoreClick}>Load More</Button>
          </>
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
