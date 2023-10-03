import React from "react";
import { Container, Typography, Paper } from "@mui/material";

const paperStyle = {
  padding: "2rem",
  marginTop: "2rem",
  backgroundColor: "#f0f0f0", // Adjust the background color as per your preference
};

const titleStyle = {
  fontSize: "2.5rem",
  fontWeight: "bold",
  marginBottom: "1rem",
};

const contentStyle = {
  fontSize: "1.2rem",
  lineHeight: "1.6",
  marginBottom: "10px",
};

export const ContactUs: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h2" style={titleStyle}>
          Contact Us
        </Typography>
        <Typography style={contentStyle}>
          Help spread the word about Paxful through press and marketing
          initiatives. Contact us for press inquiries at
          press@localbittrades.com
        </Typography>
        <Typography style={contentStyle}>
          The Bug Bounty Program gives you an opportunity to earn a reward for
          identifying technical issues. Report them at
          bugbounty@localbittrades.com.
        </Typography>
        <Typography style={contentStyle}>
          To inquire about becoming a partner. Let us know if you’re interested
          in partnering with us by emailing sales@localbittrades.com.
        </Typography>
      </Paper>
    </Container>
  );
};
