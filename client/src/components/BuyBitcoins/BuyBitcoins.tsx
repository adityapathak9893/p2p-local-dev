import { Button, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useActionDispatch, useStateSelector } from "../../hooks";
import React, { useState } from "react";

interface IBuyBitcoinsProps {
  email: string;
  userName: string;
  showFeedbackForm: boolean;
  handleFeedBackFormVisibility: () => void;
}

export const BuyBitcoins: React.FC<IBuyBitcoinsProps> = ({
  email,
  userName,
  showFeedbackForm,
  handleFeedBackFormVisibility,
}) => {
  const { doSubmitFeedback } = useActionDispatch();
  const { selectedUserDetails, isUserLoggedIn } = useStateSelector();

  const [message, setMessage] = useState<string>("");
  const [rating, setRating] = useState<number>(1);

  const handleSubmitFeedback = () => {
    doSubmitFeedback(email, userName, message, rating);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          marginTop: "30px",
          marginBottom: "50px",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Typography variant="h2" sx={{ color: "white", marginTop: "20px" }}>
          {`Buy Bitcoin from ${userName}`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          //width: "100%",
          alignItems: "center",
          justifyContent: "center",
          padding: "0px 20px 0px 20px",
        }}
      >
        {showFeedbackForm ? (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#fff",
              //width: "550px",
              height: "250px",
            }}
          >
            <Box
              sx={{
                //width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Would like to provide feedback?
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ marginBottom: "20px" }}>
                  <Select
                    value={rating}
                    onChange={(e) => {
                      setRating(Number(e.target.value));
                    }}
                    displayEmpty
                    inputProps={{ "aria-label": "Select a rating" }}
                  >
                    <MenuItem value="" disabled>
                      Select a rating
                    </MenuItem>
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ marginBottom: "20px" }}>
                  <TextField
                    label="Message"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="button" display="block" gutterBottom>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleSubmitFeedback}
                >
                  Submit Feedback
                </Button>
              </Typography>
            </Box>
          </Paper>
        ) : (
          <Paper
            elevation={3}
            sx={{
              backgroundColor: "#fff",
              //width: "550px",
              height: "250px",
            }}
          >
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "10px",
              }}
            >
              <Typography variant="h5" gutterBottom>
                How much do you want to buy?
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ marginBottom: "20px" }}>
                  <TextField
                    label="I will Pay"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">USD</InputAdornment>
                      ),
                    }}
                  />
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "10px",
                }}
              >
                <Typography sx={{ marginBottom: "20px" }}>
                  <TextField
                    label="And receive"
                    id="outlined-start-adornment"
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">BTC</InputAdornment>
                      ),
                    }}
                  />
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="button" display="block" gutterBottom>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleFeedBackFormVisibility}
                >
                  Buy Now
                </Button>
              </Typography>
            </Box>
          </Paper>
        )}
      </Box>
    </>
  );
};
