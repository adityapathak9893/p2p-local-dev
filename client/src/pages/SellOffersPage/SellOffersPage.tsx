import React, { useEffect } from "react";
import { ListItems } from "../../components/ListItems";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { Box } from "@mui/material";

export const SellOffersPage: React.FC = () => {
  const { allSellOfferDetails } = useStateSelector();
  const { setDashBoardTab } = useActionDispatch();
  /* useEffect(() => {
    setDashBoardTab("");
  }, []); */
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
        <BuySellOfferForm />
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
