import { Box, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { TabComponent } from "../../components/TabComponent";
import { UserProfile } from "../../components/UserProfile";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { ListItems } from "../../components/ListItems";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneIphoneOutlinedIcon from "@mui/icons-material/PhoneIphoneOutlined";
import PhonelinkEraseOutlinedIcon from "@mui/icons-material/PhonelinkEraseOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import PersonAddAlt1OutlinedIcon from "@mui/icons-material/PersonAddAlt1Outlined";
import { getFormattedDate } from "../../helpers";
import { FeedBackList } from "../../components/FeedBackList";

const offersTabDetails = [
  {
    value: "buyOffers",
    label: "Buy Offers",
  },
  {
    value: "sellOffers",
    label: "sell Offers",
  },
];

const feedbacksTabDetails = [
  {
    value: "positiveFeedbacks",
    label: "Positive feedbacks",
  },
  {
    value: "negativeFeedbacks",
    label: "Negative Feedbacks",
  },
];

export const UserProfilePage: React.FC = () => {
  const { userEmail } = useParams();

  const [offersTabValue, setOffersTabValue] = React.useState("buyOffers");
  const [feedbacksTabValue, setFeedbackTabValue] =
    React.useState("positiveFeedbacks");

  const { getSelectedUserDetails /* , doSubmitFeedback */ } =
    useActionDispatch();
  const { selectedUserDetails, isUserLoggedIn } = useStateSelector();

  const handleOffersTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setOffersTabValue(newValue);
  };

  const handleFeedbacksTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setFeedbackTabValue(newValue);
  };

  useEffect(() => {
    if (userEmail !== undefined) {
      console.log('userEmail', userEmail);
      getSelectedUserDetails(userEmail);
    }
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        //height: "100%",
        backgroundColor: "#fff",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
        }}
      >
        <UserProfile selectedUserDetails={selectedUserDetails} />
      </Box>

      <Box sx={{ display: "flex", padding: "20px 0px 0px 0px" }}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 200,
                height: 200,
              },
            }}
          >
            <Paper
              elevation={3}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#f8f8f8",
                  color: "#333",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "0px 0px 0px 10px",
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Verifications
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 0px 0px 10px",
                }}
              >
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ marginRight: "5px" }}
                >
                  {selectedUserDetails?.isEmailVerified ? (
                    <EmailOutlinedIcon sx={{ color: "#3e9f4d" }} />
                  ) : (
                    <EmailOutlinedIcon sx={{ color: "red" }} />
                  )}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {selectedUserDetails?.isEmailVerified
                    ? "Email verified"
                    : "Email not verified"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 0px 0px 10px",
                }}
              >
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ marginRight: "5px" }}
                >
                  {selectedUserDetails?.isPhoneVerified ? (
                    <PhoneIphoneOutlinedIcon sx={{ color: "#3e9f4d" }} />
                  ) : (
                    <PhonelinkEraseOutlinedIcon sx={{ color: "red" }} />
                  )}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {selectedUserDetails?.isPhoneVerified
                    ? "Phone verified"
                    : "Phone not verified"}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 0px 0px 10px",
                }}
              >
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ marginRight: "5px" }}
                >
                  <LocationOnOutlinedIcon sx={{ color: "#3e9f4d" }} />
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {selectedUserDetails?.location}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 0px 0px 10px",
                }}
              >
                <Typography
                  variant="body2"
                  gutterBottom
                  sx={{ marginRight: "5px" }}
                >
                  <PersonAddAlt1OutlinedIcon sx={{ color: "#3e9f4d" }} />
                </Typography>

                <Typography variant="body2" gutterBottom>
                  {getFormattedDate(String(selectedUserDetails?.joined))}
                </Typography>
              </Box>
            </Paper>
          </Box>
          {/* <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: 200,
                height: 500,
              },
            }}
          >
            <Paper
              elevation={3}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <Box
                sx={{
                  display: "flex",
                  backgroundColor: "#f8f8f8",
                  color: "#333",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography variant="subtitle1" gutterBottom>
                  Info
                </Typography>
              </Box>
              
            </Paper>
          </Box> */}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "0px 0px 0px 20px",
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TabComponent
                tabDetails={offersTabDetails}
                tabValue={offersTabValue}
                handleTabChange={handleOffersTabChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 0px 0px 0px",
              }}
            >
              {selectedUserDetails !== undefined &&
                selectedUserDetails !== null &&
                (offersTabValue === "buyOffers" ? (
                  <ListItems
                    offersList={selectedUserDetails.buyOffers}
                    isBuyOffer
                  />
                ) : (
                  <ListItems
                    offersList={selectedUserDetails.sellOffers}
                    isBuyOffer={false}
                  />
                ))}
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <TabComponent
                tabDetails={feedbacksTabDetails}
                tabValue={feedbacksTabValue}
                handleTabChange={handleFeedbacksTabChange}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "20px 0px 0px 0px",
              }}
            >
              {selectedUserDetails !== undefined &&
              selectedUserDetails !== null &&
              selectedUserDetails.feedbacks.length ? (
                feedbacksTabValue === "positiveFeedbacks" ? (
                  <FeedBackList
                    feedbackList={selectedUserDetails.feedbacks.filter(
                      (feedBack) => feedBack.isFeedBackPositive === true
                    )}
                  />
                ) : (
                  <FeedBackList
                    feedbackList={selectedUserDetails.feedbacks.filter(
                      (feedBack) => feedBack.isFeedBackPositive === false
                    )}
                  />
                )
              ) : (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  No Feedbacks received so far
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
