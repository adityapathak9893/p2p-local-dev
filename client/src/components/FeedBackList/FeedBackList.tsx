import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GradeOutlinedIcon from "@mui/icons-material/GradeOutlined";
import PersonPinOutlinedIcon from "@mui/icons-material/PersonPinOutlined";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import { Box, Tooltip } from "@mui/material";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme, styled } from "@mui/material/styles";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getFormattedDate } from "../../helpers";
import { Feedbacks } from "../../models/interfaces";
import { BackGroundAvatar } from "../BackGroundAvatar";

export interface IFeedBackListProps {
  feedbackList: Feedbacks[];
}

export const FeedBackList: React.FC<IFeedBackListProps> = ({
  feedbackList,
}) => {
  const navigate = useNavigate();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  const lightTheme = createTheme({ palette: { mode: "light" } });

  /* const handleLinkClick = (email: string) => {
    const newURL = `/user/${email}`;
    navigate(newURL);
  }; */

  return (
    <ThemeProvider theme={lightTheme}>
      {feedbackList.map((feedback, index) => {
        return (
          <Item key={index} elevation={6} sx={{ marginBottom: "20px" }}>
            <ListItem alignItems="flex-start" sx={{ padding: "16px" }}>
              <ListItemAvatar>
                <Tooltip title={feedback.givenBy_userName}>
                  <BackGroundAvatar
                    userName={feedback.givenBy_userName}
                    width={50}
                    height={50}
                  />
                </Tooltip>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Link
                    to={`/user/${feedback.givenBy_userEmail}`}
                    style={{ textDecoration: "none" }}
                    //onClick={() => handleLinkClick(feedback.givenBy_userEmail)}
                  >
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: "bold",
                        marginBottom: 1,
                        color: "#1976d2",
                        cursor: "pointer",
                      }}
                    >
                      {feedback.givenBy_userName}
                    </Typography>
                  </Link>
                }
                secondary={
                  <Box
                    sx={{
                      display: "flex",
                      minHeight: "120px",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                        flex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          <PersonPinOutlinedIcon sx={{ marginRight: 0.5 }} />
                          location:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          {feedback.givenBy_userName_location}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          <AccessTimeOutlinedIcon sx={{ marginRight: 0.5 }} />
                          Given at:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          {getFormattedDate(feedback.createdAt)}
                        </Typography>
                      </Box>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        marginLeft: "20px",
                        flex: 1,
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          <GradeOutlinedIcon sx={{ marginRight: 0.5 }} />
                          Ratings:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          {feedback.rating}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flex: 1,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                          sx={{ marginRight: "10px" }}
                        >
                          <ReviewsOutlinedIcon sx={{ marginRight: 0.5 }} />
                          Feedback:
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          display="flex"
                          alignItems="center"
                        >
                          {feedback.message}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                }
              />
            </ListItem>
          </Item>
        );
      })}
    </ThemeProvider>
  );
};
