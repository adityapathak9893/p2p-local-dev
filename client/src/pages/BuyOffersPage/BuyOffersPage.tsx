import { Box } from "@mui/material";
import React from "react";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { ListItems } from "../../components/ListItems";
import { useActionDispatch, useStateSelector } from "../../hooks";

export const BuyOffersPage: React.FC = () => {
  const { allBuyOfferDetails } = useStateSelector();
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
        {!!allBuyOfferDetails.length ? (
          <ListItems offersList={allBuyOfferDetails} isBuyOffer={false} />
        ) : (
          "There are currently no buy offers available for your criteria!"
        )}
      </Box>
    </Box>
  );
};
