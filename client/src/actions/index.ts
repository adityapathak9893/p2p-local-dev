import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  doUserSignInApiCall,
  doUserSignOutApiCall,
  doUserSignUpApiCall,
  getSignedInUserApiCall,
} from "../data-services";
import {
  GET_USER_PROFILE,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGN_UP,
} from "../models/constants";
import {
  BuyOfferDetails,
  SellOfferDetails,
  UserProfileDetails,
} from "../models/interfaces";
import { initializedUserProfileDetails } from "../models/initializations";

export const doUserSignUp = createAsyncThunk<
  {
    message: string;
  },
  { phone: string; email: string; password: string }
>(
  USER_SIGN_UP,
  async (signUpDetails: { phone: string; email: string; password: string }) => {
    const { phone, email, password } = signUpDetails;
    const responseData = await doUserSignUpApiCall(phone, email, password);
    return {
      message: responseData,
    };
  }
);

export const doUserSignIn = createAsyncThunk<
  {
    isUserLoggedIn: boolean;
    errorMessage: string;
  },
  { email: string; password: string }
>(USER_SIGN_IN, async (signInDetails: { email: string; password: string }) => {
  const { email, password } = signInDetails;
  const userSignInInfo = await doUserSignInApiCall(email, password);
  if (userSignInInfo.isSuccessfullySignedIn) {
    return {
      isUserLoggedIn: true,
      errorMessage: "",
    };
  } else {
    return {
      isUserLoggedIn: false,
      errorMessage: userSignInInfo.errorMessage,
    };
  }
});

export const getSignedInUser = createAsyncThunk<{
  userProfileDetails: UserProfileDetails;
  isUserLoggedIn: boolean;
}>(GET_USER_PROFILE, async () => {
  const result = await getSignedInUserApiCall();
  if (result.error || result.userProfileDetails === undefined) {
    return {
      userProfileDetails: initializedUserProfileDetails,
      isUserLoggedIn: false,
    };
  } else {
    return {
      userProfileDetails: result.userProfileDetails,
      isUserLoggedIn: true,
    };
  }
});

export const doUserSignOut = createAsyncThunk<{
  userProfileDetails: UserProfileDetails;
  userBuyOfferDetails: BuyOfferDetails[];
  userSellOfferDetails: SellOfferDetails[];
  isUserLoggedIn: boolean;
}>(USER_SIGN_OUT, async () => {
  return doUserSignOutApiCall().then(() => {
    return {
      userProfileDetails: initializedUserProfileDetails,
      isUserLoggedIn: false,
      userBuyOfferDetails: [],
      userSellOfferDetails: [],
    };
  });
});
