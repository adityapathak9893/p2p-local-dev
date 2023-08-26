import React from "react";
import {
  Avatar,
  Typography,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import { Feedbacks } from "../../models/interfaces";

interface IUserProfileProps {
  userName: string;
  userEmail: string;
  feedbacks: Feedbacks[];
}

export const UserProfile: React.FC<IUserProfileProps> = ({
  userName,
  userEmail,
  feedbacks,
}) => {
  return (
    <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
      <Avatar
        alt={userName}
        src={`/static/images/avatar/${userName}.jpg`}
        sx={{ width: 100, height: 100, margin: "0 auto", mb: 2 }}
      />
      <Typography variant="h4">{userName}</Typography>
      <Typography variant="body1" color="textSecondary">
        {userEmail}
      </Typography>

      <Box mt={4}>
        <Typography variant="h5">Feedbacks Received:</Typography>
        <List sx={{ width: "100%", maxWidth: 600, margin: "0 auto", mt: 2 }}>
          {feedbacks.map((feedback, index) => (
            <React.Fragment key={index}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt={feedback.givenBy_userName}
                    src={`/static/images/avatar/${feedback.givenBy_userName}.jpg`}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <>
                      <Typography
                        variant="subtitle2"
                        color="textSecondary"
                        sx={{ marginRight: 1 }}
                      >
                        Rated by:
                      </Typography>
                      {feedback.givenBy_userName}
                    </>
                  }
                  secondary={
                    <>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginRight: 1 }}
                      >
                        Rating:
                      </Typography>
                      {feedback.rating}
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{ marginRight: 1 }}
                      >
                        message:
                      </Typography>
                      {feedback.message}
                    </>
                  }
                  sx={{ wordBreak: "break-word" }}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Paper>
  );
};
