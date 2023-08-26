import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Box, CssBaseline } from "@mui/material";
import React, { useEffect } from "react";
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
      icon: <MonetizationOnIcon />,
      text: "My buy offers",
      key: "myBuyOffers",
      path: "myBuyOffers",
    },
    {
      icon: <MonetizationOnIcon />,
      text: "My sell offers",
      key: "mySellOffers",
      path: "mySellOffers",
    },
    {
      icon: <InboxIcon />,
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
                !!myAllBuyOffersDetails.length ? (
                  <OffersPage offersList={myAllBuyOffersDetails} isBuyOffer />
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
              }
            />
            <Route
              path="mySellOffers"
              element={
                !!myAllSellOffersDetails.length ? (
                  <OffersPage
                    offersList={myAllSellOffersDetails}
                    isBuyOffer={false}
                  />
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
              }
            />
          </Route>
        </Routes>
      </Box>
    </Box>
  );
};
