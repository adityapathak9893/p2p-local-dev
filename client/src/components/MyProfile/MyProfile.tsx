import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { UserProfileDetails } from "../../models/interfaces";

interface MyProfileProps {
  userProfile: UserProfileDetails;
  onSave: (updatedProfile: UserProfileDetails) => void;
}

export const MyProfile: React.FC<MyProfileProps> = ({
  userProfile,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState(userProfile);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    onSave(editedProfile);
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setEditedProfile(userProfile);
    setIsEditing(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const { name, value } = event.target;
    setEditedProfile({
      ...editedProfile,
      [name as string]: value,
    });
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setEditedProfile({
      ...editedProfile,
      [name as string]: value,
    });
  };

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        My Profile
      </Typography>
      <Avatar sx={{ width: 100, height: 100 }} />
      <Box mt={4}>
        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={editedProfile.phone}
          onChange={handleTextChange}
          disabled={!isEditing}
        />
      </Box>
      <Box mt={4}>
        <TextField
          fullWidth
          label="User Name"
          name="userName"
          value={editedProfile.userName}
          onChange={handleTextChange}
          disabled={!isEditing}
        />
      </Box>
      <Box mt={4}>
        <TextField
          fullWidth
          label="Wallet Address"
          name="walletAddress"
          value={editedProfile.walletAddress}
          onChange={handleTextChange}
          disabled={!isEditing}
        />
      </Box>
      <Box mt={4}>
        <TextField
          fullWidth
          label="User Bio"
          name="userBio"
          multiline
          rows={3}
          value={editedProfile.userBio}
          onChange={handleTextChange}
          disabled={!isEditing}
        />
      </Box>
      <Box mt={4}>
        <FormControl fullWidth>
          <InputLabel id="preferredCurrency">
            Preferred Currency
          </InputLabel>
          <Select
            id="preferredCurrency"
            name="preferredCurrency"
            value={editedProfile.preferredCurrency}
            onChange={handleChange}
            disabled={!isEditing}
          >
            {["USD", "EUR", "AUD", "CAD", "HKD", "SGD", "TWD"].map(
              (currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>
      <Box mt={4}>
        <FormControl fullWidth>
          <InputLabel htmlFor="location">Location</InputLabel>
          <Select
            id="location"
            name="location"
            value={editedProfile.location}
            onChange={handleChange}
            disabled={!isEditing}
          >
            {[
              "USA",
              "UK",
              "GERMANY",
              "FRANCE",
              "SWITZERLAND",
              "FINLAND",
              "POLAND",
              "SPAIN",
              "AUSTRALIA",
              "CANADA",
              "HONG KONG",
              "SINGAPORE",
              "TAIWAN",
            ].map((location) => (
              <MenuItem key={location} value={location}>
                {location}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {!isEditing ? (
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Email: {userProfile.email}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Languages: {userProfile.languages}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Joined: {userProfile.joined}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Online: {userProfile.isOnline ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Phone Verified: {userProfile.isPhoneVerified ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Email Verified: {userProfile.isEmailVerified ? "Yes" : "No"}
          </Typography>
        </Box>
      ) : (
        <Box mt={2}>
          <Button variant="contained" onClick={handleSaveClick}>
            Save
          </Button>
          <Button variant="outlined" onClick={handleCancelClick}>
            Cancel
          </Button>
        </Box>
      )}
      {!isEditing && (
        <Box mt={2}>
          <Button variant="outlined" onClick={handleEditClick}>
            Edit
          </Button>
        </Box>
      )}
    </Paper>
  );
};
