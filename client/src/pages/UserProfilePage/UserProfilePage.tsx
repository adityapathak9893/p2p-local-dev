import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserProfile } from "../../components/UserProfile";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { Box } from "@mui/material";
import { FeedBackForm } from "../../components/FeedBackForm";

export const UserProfilePage: React.FC = () => {
  const location = useLocation();
  const state = location.state;

  const { userName, userEmail } = state;

  const { getUserFeedback, setDashBoardTab, doSubmitFeedback } =
    useActionDispatch();
  const {
    feedBacksReceivedBySelectedUser,
    activeDashBoardTab,
    isUserLoggedIn,
  } = useStateSelector();

  const handleSubmit = (feedback: { message: string; rating: number }) => {
    doSubmitFeedback(userName, feedback.message, feedback.rating).then(() => {
      getUserFeedback(userName);
    });
  };

  useEffect(() => {
    if (!activeDashBoardTab) {
      setDashBoardTab("kgkg");
      getUserFeedback(userName);
    }
  }, [activeDashBoardTab]);

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
