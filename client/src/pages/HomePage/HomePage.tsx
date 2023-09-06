import React from "react";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { BUY } from "../../models/constants";
import { OfferFormDetails } from "../../models/interfaces";
import { useNavigate } from "react-router";
import "./HomePage.scss";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

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
      <Box
        sx={{
          display: "flex",
          marginTop: "30px",
          marginBottom: "50px",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ color: "white", marginTop: "20px" }}>
          Trade Bitcoin on Bittrader
        </Typography>
        <Typography variant="h5" sx={{ color: "white", marginTop: "20px" }}>
          Join over thousands of people just like you on everyone's favorite
          peer-to-peer platform to buy and sell Bitcoin.
        </Typography>
      </Box>
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
