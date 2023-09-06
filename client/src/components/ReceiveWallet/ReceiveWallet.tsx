import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
import QRCode from "qrcode.react";

export const ReceiveWallet: React.FC = () => {
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
            Your Bitcoin wallet address
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
            <QRCode value="fgkjfdlkjg654d6f54654654654654fgdfgdfg6" size={80} />
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
            <Typography variant="caption" gutterBottom>
              fgkjfdlkjg654d6f54654654654654fgdfgdfg6
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
          <Button variant="contained" endIcon={<ContentCopyOutlinedIcon />}>
            Copy Address
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
