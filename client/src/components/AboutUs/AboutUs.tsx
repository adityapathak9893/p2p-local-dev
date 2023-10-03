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

export const AboutUs: React.FC = () => {
  return (
    <Container maxWidth="md">
      <Paper elevation={3} style={paperStyle}>
        <Typography variant="h2" style={titleStyle}>
          About Us
        </Typography>
        <Typography style={contentStyle}>
          Welcome to our amazing world! We are a passionate team dedicated to
          providing you with the best experiences and services. Our mission is
          to make your life easier and more enjoyable.
        </Typography>
        <Typography style={contentStyle}>
          With a commitment to innovation and excellence, we strive to exceed
          your expectations. Our core values include integrity, creativity, and
          customer satisfaction.
        </Typography>
        <Typography style={contentStyle}>
          Thank you for choosing us. We look forward to serving you and being a
          part of your journey.
        </Typography>
      </Paper>
    </Container>
  );
};
