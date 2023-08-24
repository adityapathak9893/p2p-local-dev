import MailIcon from "@mui/icons-material/Mail";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Box, CssBaseline } from "@mui/material";
import React, { useEffect, useLayoutEffect } from "react";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { SideDrawer } from "../../components/SideDrawer";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { OffersPage } from "../OffersPage";

export const UserDashBoardPage: React.FC = () => {
  const navigate = useNavigate();

  const { getMyBuyOffers, getMySellOffers, setDashBoardTab } =
    useActionDispatch();
  const { myAllBuyOffersDetails, myAllSellOffersDetails, activeDashBoardTab } =
    useStateSelector();

  const listItems = [
    {
      icon: <InboxIcon />,
      text: "My buy offers",
      key: "myBuyOffers",
      path: "myBuyOffers",
    },
    {
      icon: <MailIcon />,
      text: "My sell offers",
      key: "mySellOffers",
      path: "mySellOffers",
    },
    {
      icon: <InboxIcon />,
      text: "My trade history",
      key: "myTradeHistory",
      path: "myTradeHistory",
    },
    {
      icon: <MailIcon />,
      text: "Received feedbacks",
      key: "receivedFeedbacks",
      path: "receivedFeedbacks",
    },
  ];

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
    if (!activeDashBoardTab) {
      navigate("/user-dashboard/myBuyOffers");
      setDashBoardTab("myBuyOffers");
      getMyBuyOffers();
    }
  }, [activeDashBoardTab]);

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <SideDrawer
        listItems={listItems}
        selectedItem={activeDashBoardTab}
        handleListItemClick={handleListItemClick}
      />
      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <Routes>
          <Route path="/" element={<Outlet />}>
            <Route
              path="myBuyOffers"
              element={
                <OffersPage offersList={myAllBuyOffersDetails} isBuyOffer />
              }
            />
            <Route
              path="mySellOffers"
              element={
                <OffersPage
                  offersList={myAllSellOffersDetails}
                  isBuyOffer={false}
                />
              }
            />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};
