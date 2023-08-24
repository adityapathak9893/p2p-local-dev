import React from "react";
import { useLocation, useParams } from "react-router-dom";

export const OtherUserProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const location = useLocation();
  const state = location.state;

  return (
    <div>
      <h2>User Profile: {username}</h2>
      <h2>{state.userEmail}</h2>
      {/* Display user profile details here */}
    </div>
  );
};
