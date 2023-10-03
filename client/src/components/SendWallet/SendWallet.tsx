import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { useActionDispatch, useStateSelector } from "../../hooks";

export const SendWallet: React.FC = () => {
  const { sendWithdrawalNotification } = useActionDispatch();
  const { userProfileDetails } = useStateSelector();

  const [amount, setAmount] = useState(0);
  const [reqWalletAddress, setReqWalletAddress] = useState("");

  const handleWithdrawalRequest = () => {
    sendWithdrawalNotification(
      userProfileDetails.userName,
      String(amount),
      reqWalletAddress
    );
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          border: "2px solid grey",
          borderRadius: "10px",
          height: "80%",
          width: "50%",
          backgroundColor: "#fff",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "20px",
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography sx={{ marginRight: "10px" }}>
            <PaymentsOutlinedIcon />
          </Typography>
          <Typography sx={{ marginRight: "10px" }} variant="h5">
            Withdraw Bitcoin(s)
          </Typography>
        </Box>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{
            display: "flex",
            flex: 4,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "20px",
            width: "100%",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px" }}>
            <TextField
              id="outlined-basic"
              label="Wallet Address"
              variant="outlined"
              value={reqWalletAddress}
              onChange={(e) => setReqWalletAddress(e.target.value)}
            />
          </Typography>
          <Typography variant="h6">
            <TextField
              id="outlined-basic"
              label="Amount (in BTC)"
              variant="outlined"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </Typography>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              marginRight: "10px",
            }}
            variant="caption"
            display="block"
            gutterBottom
          >
            Withdrawals are processed manually
          </Typography>
          <Typography variant="button" display="block" gutterBottom>
            <Button
              variant="contained"
              size="small"
              onClick={handleWithdrawalRequest}
            >
              Request Withdrawal
            </Button>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
