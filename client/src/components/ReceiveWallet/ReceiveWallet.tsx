import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import copy from "clipboard-copy";
import QRCode from "qrcode.react";
import React, { useEffect, useRef, useState } from "react";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { NotificationPopper } from "../NotificationPopper";

export const ReceiveWallet: React.FC = () => {
  const CopyButtonRef = useRef<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { getUserBalance } = useActionDispatch();
  const { userProfileDetails } = useStateSelector();

  useEffect(() => {
    getUserBalance(userProfileDetails.walletAddress);
  }, []);

  const handleCopyClick = async () => {
    try {
      if (CopyButtonRef.current) {
        await copy(CopyButtonRef.current);
        setSnackbarOpen(true);
      }
    } catch (err) {
      alert("Failed to copy text to clipboard.");
    }
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
          <Typography sx={{ marginRight: "10px" }} variant="h5">
            Your Bittrader wallet address
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flex: 4,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f9f9f9",
            borderRadius: "20px",
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              border: "solid 1px black",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <QRCode value={userProfileDetails.walletAddress} size={80} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "10px",
            }}
          >
            <Typography variant="subtitle2" display="block" gutterBottom>
              Use this address to deposit Bitcoin (BTC):
            </Typography>
            <Typography
              variant="caption"
              gutterBottom
              ref={(el) => (CopyButtonRef.current = el?.textContent || null)}
            >
              {userProfileDetails.walletAddress}
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            width: "100%",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            endIcon={<ContentCopyOutlinedIcon />}
            onClick={handleCopyClick}
          >
            Copy Address
          </Button>
        </Box>
      </Box>
      {snackbarOpen && (
        <NotificationPopper message="Copied!" doesErrorOccur={false} />
      )}
    </Box>
  );
};
