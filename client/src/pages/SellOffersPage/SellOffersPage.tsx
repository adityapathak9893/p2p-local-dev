import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { ListItems } from "../../components/ListItems";
import { useStateSelector, useActionDispatch } from "../../hooks";
import { OfferFormDetails } from "../../models/interfaces";
import { BUY } from "../../models/constants";

export const SellOffersPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setBuyOfferFormDetails, setTradeMode, getSellOffersWithFilters } =
    useActionDispatch();
  const {
    buyOfferFormDetails,
    tradeMode,
    allSellOfferDetails,
    isUserLoggedIn,
  } = useStateSelector();

  const {
    cryptoCurrency,
    paymentMethod,
    preferredCurrency,
    money,
    location,
    isFormValid,
  } = buyOfferFormDetails;

  useEffect(() => {
    // Fetch data for the initial page (page 1)
    fetchData(currentPage);
  }, [currentPage]); // Fetch data whenever the page number changes

  // Function to fetch data based on page number
  const fetchData = (page: number) => {
    //setTradeMode to BUY
    setTradeMode(BUY);
    // Make an API request with the updated page parameter
    getSellOffersWithFilters(
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
      getSellOffersWithFilters(
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
          padding: "0px 20px",
          flexDirection: "column",
          flex: 3,
        }}
      >
        {!!allSellOfferDetails.length ? (
          <>
            <ListItems
              offersList={allSellOfferDetails}
              isBuyOffer
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
              There are currently no Sell offers available for the applied
              filters!
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};
