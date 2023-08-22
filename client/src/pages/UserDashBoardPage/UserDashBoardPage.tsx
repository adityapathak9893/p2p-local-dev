import React, { useState } from "react";
import { SideDrawer } from "../../components/SideDrawer";
import { UserDashBoard } from "../../components/UserDashBoard";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { Box, CssBaseline, Typography } from "@mui/material";

export const UserDashBoardPage: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(
    "myBuyOffers"
  );
  const listItems = [
    { icon: <InboxIcon />, text: "My buy offers", key: "myBuyOffers" },
    { icon: <MailIcon />, text: "My sell offers", key: "mySellOffers" },
    { icon: <InboxIcon />, text: "My trade history", key: "myTradeHistory" },
    {
      icon: <MailIcon />,
      text: "Received feedbacks",
      key: "receivedFeedbacks",
    },
  ];

  const handleListItemClick = (key: string) => {
    setSelectedItem(key);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideDrawer
        listItems={listItems}
        selectedItem={selectedItem}
        handleListItemClick={handleListItemClick}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography paragraph>
          <UserDashBoard />
        </Typography>
      </Box>
    </Box>
  );
};
