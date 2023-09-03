import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Box, CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
import { ListItems } from "../../components/ListItems";
import { SideDrawer } from "../../components/SideDrawer";
import { useActionDispatch, useStateSelector } from "../../hooks";

const listItems = [
  {
    icon: <MonetizationOnIcon />,
    text: "My buy offers",
    key: "myBuyOffers",
  },
  {
    icon: <MonetizationOnIcon />,
    text: "My sell offers",
    key: "mySellOffers",
  },
  {
    icon: <InboxIcon />,
    text: "Received feedbacks",
    key: "receivedFeedbacks",
  },
];

export const UserDashBoardPage: React.FC = () => {
  const { getMyBuyOffers, getMySellOffers, setDashBoardTab } =
    useActionDispatch();
  const { myAllBuyOffersDetails, myAllSellOffersDetails, activeDashBoardTab } =
    useStateSelector();

  const handleListItemClick = (key: string) => {
    setDashBoardTab(key);
    if (key === "myBuyOffers") {
      getMyBuyOffers();
    }
    if (key === "mySellOffers") {
      getMySellOffers();
    }
  };

  useEffect(() => {
    handleListItemClick("myBuyOffers");
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <SideDrawer
        listItems={listItems}
        selectedItem={activeDashBoardTab}
        handleListItemClick={handleListItemClick}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        {activeDashBoardTab === "myBuyOffers" ? (
          !!myAllBuyOffersDetails.length ? (
            <ListItems offersList={myAllBuyOffersDetails} isBuyOffer />
          ) : (
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                flex: 3,
              }}
            >
              You haven't placed any buy offer yet
            </Box>
          )
        ) : activeDashBoardTab === "mySellOffers" ? (
          !!myAllSellOffersDetails.length ? (
            <ListItems offersList={myAllSellOffersDetails} isBuyOffer={false} />
          ) : (
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                flex: 3,
              }}
            >
              You haven't placed any sell offer yet
            </Box>
          )
        ) : (
          activeDashBoardTab === "receivedFeedbacks" && (
            <h1>This is in progress</h1>
          )
        )}
      </Box>
    </Box>
  );
};
