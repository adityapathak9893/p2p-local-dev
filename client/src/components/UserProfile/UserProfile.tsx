import ThumbDownAltOutlinedIcon from "@mui/icons-material/ThumbDownAltOutlined";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Box, Paper, Tooltip, Typography } from "@mui/material";
import React from "react";
import { SelectedUserDetails } from "../../models/interfaces";
import { BackGroundAvatar } from "../BackGroundAvatar";

interface IUserProfileProps {
  selectedUserDetails: SelectedUserDetails | null;
}

export const UserProfile: React.FC<IUserProfileProps> = ({
  selectedUserDetails,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "20px",
        }}
      >
        <Tooltip
          title={!!selectedUserDetails ? selectedUserDetails.userName : ""}
        >
          <BackGroundAvatar
            userName={!!selectedUserDetails ? selectedUserDetails.userName : ""}
            width={200}
            height={200}
          />
        </Tooltip>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h3" gutterBottom>
          {selectedUserDetails?.userName}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {selectedUserDetails?.userBio}
        </Typography>
        <Box sx={{ display: "flex", marginBottom: "10px" }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              marginRight: "10px",
            }}
          >
            {selectedUserDetails?.isOnline ? (
              <VisibilityOutlinedIcon sx={{ color: "#3e9f4d" }} />
            ) : (
              <VisibilityOffOutlinedIcon sx={{ color: "#ffab00" }} />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="subtitle2"
              gutterBottom
              sx={{ color: "#626262" }}
            >
              {selectedUserDetails?.isOnline ? "Online" : "Offline"}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Paper
            sx={{
              backgroundColor: "#f3fcf3",
              padding: "10px",
              marginRight: "20px",
              width: "150px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#3e9f4d" }}
                gutterBottom
              >
                {
                  selectedUserDetails?.feedbacks.filter(
                    (feedback) => feedback.isFeedBackPositive === true
                  ).length
                }
              </Typography>
              <Typography>
                <ThumbUpAltOutlinedIcon sx={{ color: "#3e9f4d" }} />
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body2" gutterBottom>
                Positive feedback
              </Typography>
            </Box>
          </Paper>
          <Paper
            sx={{ backgroundColor: "#fff9fa", padding: "10px", width: "150px" }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography
                variant="subtitle2"
                sx={{ color: "#e3394d" }}
                gutterBottom
              >
                {
                  selectedUserDetails?.feedbacks.filter(
                    (feedback) => feedback.isFeedBackPositive === false
                  ).length
                }
              </Typography>
              <Typography>
                <ThumbDownAltOutlinedIcon sx={{ color: "#e3394d" }} />
              </Typography>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Typography variant="body2" gutterBottom>
                Negative feedback
              </Typography>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};
