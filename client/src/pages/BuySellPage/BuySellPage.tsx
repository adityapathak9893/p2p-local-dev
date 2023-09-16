import React, { useState } from "react";
import { BuyBitcoins } from "../../components/BuyBitcoins";
import { useLocation } from "react-router-dom";
import { SellBitcoins } from "../../components/SellBitcoins";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export const BuySellPage: React.FC = () => {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const email = params.get("email");
  const userName = params.get("userName");
  const isBuyOffer = params.get("isBuyOffer");

  const [showFeedBackForm, setShowFeedBackForm] = useState(false);

  return email && userName ? (
    isBuyOffer === "true" ? (
      <BuyBitcoins
        email={email}
        userName={userName}
        showFeedbackForm={showFeedBackForm}
        handleFeedBackFormVisibility={() => setShowFeedBackForm(true)}
      />
    ) : (
      <SellBitcoins
        email={email}
        userName={userName}
        showFeedbackForm={showFeedBackForm}
        handleFeedBackFormVisibility={() => setShowFeedBackForm(true)}
      />
    )
  ) : (
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
        Please valid parameters in the URL
      </Typography>
    </Box>
  );
};
