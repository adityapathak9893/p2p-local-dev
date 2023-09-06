import React from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import SendIcon from "@mui/icons-material/Send";

export const SendWallet: React.FC = () => {
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
            <SendOutlinedIcon />
          </Typography>
          <Typography sx={{ marginRight: "10px" }} variant="h5">
            Sending Bitcoin
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
          <Typography variant="h5" sx={{ marginBottom: "20px" }}>
            <TextField
              id="outlined-basic"
              label="Wallet Address"
              variant="outlined"
            />
          </Typography>
          <Typography variant="h5">
            <TextField id="outlined-basic" label="Amount" variant="outlined" />
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
          <Button variant="contained" endIcon={<SendIcon />}>
            Send
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
