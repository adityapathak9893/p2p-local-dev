import React from "react";
import { MyProfile } from "../../components/MyProfile";
import { useStateSelector } from "../../hooks";

export const MyProfilePage: React.FC = () => {
  const {
    isUserLoggedIn,
    messageFromBackend,
    isRequestPending,
    doesErrorOccur,
    userProfileDetails,
  } = useStateSelector();
  return (
    <MyProfile
      userProfile={userProfileDetails}
      onSave={() => alert("Details saved")}
    />
  );
};
