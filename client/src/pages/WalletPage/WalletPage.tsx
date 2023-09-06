import React, { useState } from "react";
import { SendWallet } from "../../components/SendWallet";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { Box, CssBaseline } from "@mui/material";
import { SideDrawer } from "../../components/SideDrawer";
import { ReceiveWallet } from "../../components/ReceiveWallet";

export const WalletPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("sendToWallet");
  const handleListItemClick = (key: string) => {
    setSelectedItem(key);
  };

  const listItems = [
    {
      icon: <SendOutlinedIcon />,
      text: "Send to other wallets",
      key: "sendToWallet",
    },
    {
      icon: <CallReceivedOutlinedIcon />,
      text: "Receive/deposit to your wallet ",
      key: "depositToWallet",
    },
    {
      icon: <AccountBalanceOutlinedIcon />,
      text: "Your Wallet Balance",
      key: "walletBalance",
    },
    {
      icon: <PaymentsOutlinedIcon />,
      text: "Withdraw from your wallet",
      key: "withDraw",
    },
  ];
  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <SideDrawer
        listItems={listItems}
        selectedItem={selectedItem}
        handleListItemClick={handleListItemClick}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        {selectedItem === "sendToWallet" ? (
          <SendWallet />
        ) : selectedItem === "depositToWallet" ? (
          <ReceiveWallet />
        ) : (
          "In progress"
        )}
      </Box>
    </Box>
  );
};
