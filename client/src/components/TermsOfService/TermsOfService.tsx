import React from "react";
import { Container, Typography, Box } from "@mui/material";

export const TermsOfService: React.FC = () => {
  return (
    <Container
      sx={{
        width: "100%",
        height: "100%",
        background: "#ffff",
      }}
    >
      <Typography variant="h4" style={{ marginBottom: "20px" }}>
        Terms of Service
      </Typography>
      <Box style={{ marginBottom: "20px" }}>
        <Typography variant="h6">Introduction</Typography>
        <Typography>
          Welcome to our website. If you continue to browse and use this
          website, you are agreeing to comply with and be bound by the following
          terms and conditions of use, which together with our privacy policy
          govern our relationship with you in relation to this website. If you
          disagree with any part of these terms and conditions, please do not
          use our website.
        </Typography>
      </Box>
      <Box style={{ marginBottom: "20px" }}>
        <Typography variant="h6">Intellectual Property Rights</Typography>
        <Typography>
          This website contains material which is owned by or licensed to us.
          This material includes, but is not limited to, the design, layout,
          look, appearance, and graphics. Reproduction is prohibited other than
          in accordance with the copyright notice, which forms part of these
          terms and conditions.
        </Typography>
      </Box>
    </Container>
  );
};
