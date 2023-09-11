import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { Box, CssBaseline, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { ListItems } from "../../components/ListItems";
import { SideDrawer } from "../../components/SideDrawer";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { FeedBackList } from "../../components/FeedBackList";

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
  const {
    getMyBuyOffers,
    getMySellOffers,
    setDashBoardTab,
    getFeedbacksReceivedByMe,
  } = useActionDispatch();
  const {
    myAllBuyOffersDetails,
    myAllSellOffersDetails,
    activeDashBoardTab,
    myReceivedfeedBacks,
  } = useStateSelector();

  const handleListItemClick = (key: string) => {
    setDashBoardTab(key);
    if (key === "myBuyOffers") {
      getMyBuyOffers();
    }
    if (key === "mySellOffers") {
      getMySellOffers();
    }
    if (key === "receivedFeedbacks") {
      getFeedbacksReceivedByMe();
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
      <Box component="main" sx={{ flexGrow: 1, padding: "0px 20px" }}>
        {activeDashBoardTab === "myBuyOffers" ? (
          !!myAllBuyOffersDetails.length ? (
            <ListItems
              offersList={myAllBuyOffersDetails}
              isBuyOffer
              isButtonDisabled={true}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                You haven't placed any buy offer yet
              </Typography>
            </Box>
          )
        ) : activeDashBoardTab === "mySellOffers" ? (
          !!myAllSellOffersDetails.length ? (
            <ListItems
              offersList={myAllSellOffersDetails}
              isBuyOffer={false}
              isButtonDisabled={true}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                You haven't placed any sell offer yet
              </Typography>
            </Box>
          )
        ) : (
          activeDashBoardTab === "receivedFeedbacks" &&
          (!!myReceivedfeedBacks.length ? (
            <FeedBackList feedbackList={myReceivedfeedBacks} />
          ) : (
            <Box
              sx={{
                display: "flex",
                flex: 3,
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Typography variant="h5" sx={{ color: "white" }}>
                You haven't placed any sell offer yet
              </Typography>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
};
