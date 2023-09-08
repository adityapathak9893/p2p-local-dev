import React, { useState } from "react";
import { SendWallet } from "../../components/SendWallet";
import CallReceivedOutlinedIcon from "@mui/icons-material/CallReceivedOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import { Box, CssBaseline } from "@mui/material";
import { SideDrawer } from "../../components/SideDrawer";
import { ReceiveWallet } from "../../components/ReceiveWallet";

export const WalletPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState("requestWithDrawal");
  const handleListItemClick = (key: string) => {
    setSelectedItem(key);
  };

  const listItems = [
    {
      icon: <PaymentsOutlinedIcon />,
      text: "Request for withdrawal",
      key: "requestWithDrawal",
    },
    {
      icon: <CallReceivedOutlinedIcon />,
      text: "Receive/deposit to your wallet ",
      key: "depositToWallet",
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
        {selectedItem === "requestWithDrawal" ? (
          <SendWallet />
        ) : (
          <ReceiveWallet />
        )}
      </Box>
    </Box>
  );
};
