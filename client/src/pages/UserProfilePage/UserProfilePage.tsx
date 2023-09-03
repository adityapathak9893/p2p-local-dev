import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FeedBackForm } from "../../components/FeedBackForm";
import { UserProfile } from "../../components/UserProfile";
import { useActionDispatch, useStateSelector } from "../../hooks";

export const UserProfilePage: React.FC = () => {
  const location = useLocation();
  const state = location.state;

  const { userName, userEmail } = state;

  const { getUserFeedback, doSubmitFeedback } = useActionDispatch();
  const { feedBacksReceivedBySelectedUser, isUserLoggedIn } =
    useStateSelector();

  useEffect(() => {
    getUserFeedback(userName);
  }, []);

  const handleSubmit = (feedback: { message: string; rating: number }) => {
    doSubmitFeedback(userName, feedback.message, feedback.rating).then(() => {
      getUserFeedback(userName);
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        sx={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <UserProfile
          userEmail={userEmail}
          userName={userName}
          feedbacks={feedBacksReceivedBySelectedUser}
        />
      </Box>
      {isUserLoggedIn && (
        <Box
          sx={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FeedBackForm onSubmit={handleSubmit} />
        </Box>
      )}
    </Box>
  );
};
