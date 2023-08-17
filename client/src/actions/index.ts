import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doUserSignInApiCall,
  doUserSignOutApiCall,
  doUserSignUpApiCall,
  getSignedInUserApiCall,
} from "../data-services";
import {
  GET_USER_PROFILE,
  RESET_BACKEND_MESSAGE,
  RESET_ERROR_STATE,
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
import { RootState } from "../reducers/store";

export const resetBackendMessage = createAction(RESET_BACKEND_MESSAGE, () => ({
  payload: "",
}));

export const resetErrorState = createAction(RESET_ERROR_STATE, () => ({
  payload: false,
}));

export const doUserSignUp = createAsyncThunk<
  {
    message: string;
    doesErrorOccur: boolean;
  },
  { phone: string; email: string; password: string }
>(
  USER_SIGN_UP,
  async (signUpDetails: { phone: string; email: string; password: string }) => {
    const { phone, email, password } = signUpDetails;
    const responseData = await doUserSignUpApiCall(phone, email, password);
    return {
      message: responseData.message,
      doesErrorOccur: responseData.doesErrorOccur,
    };
  }
);

export const doUserSignIn = createAsyncThunk<
  {
    isUserLoggedIn: boolean;
    doesErrorOccur: boolean;
    message: string;
  },
  { email: string; password: string }
>(USER_SIGN_IN, async (signInDetails: { email: string; password: string }) => {
  const { email, password } = signInDetails;
  const userSignInInfo = await doUserSignInApiCall(email, password);
  if (userSignInInfo.isSuccessfullySignedIn) {
    return {
      isUserLoggedIn: true,
      doesErrorOccur: false,
      message: "",
    };
  } else {
    return {
      isUserLoggedIn: false,
      doesErrorOccur: true,
      message: userSignInInfo.message,
    };
  }
});

export const getSignedInUser = createAsyncThunk<{
  message: string;
  doesErrorOccur: boolean;
  userProfileDetails: UserProfileDetails;
  isUserLoggedIn: boolean;
}>(GET_USER_PROFILE, async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const result = await getSignedInUserApiCall(
    state.messageFromBackend,
    state.doesErrorOccur
  );
  return {
    message: result.message,
    doesErrorOccur: result.doesErrorOccur,
    userProfileDetails: result.userProfileDetails,
    isUserLoggedIn: result.isUserLoggedIn,
  };
});

export const doUserSignOut = createAsyncThunk<{
  userProfileDetails: UserProfileDetails;
  userBuyOfferDetails: BuyOfferDetails[];
  userSellOfferDetails: SellOfferDetails[];
  isUserLoggedIn: boolean;
  message: string;
  doesErrorOccur: boolean;
}>(USER_SIGN_OUT, async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState;
  const signOutInfo = await doUserSignOutApiCall();
  if (signOutInfo.isUserLoggedIn) {
    return {
      userProfileDetails: state.userProfileDetails,
      isUserLoggedIn: signOutInfo.isUserLoggedIn,
      message: signOutInfo.message,
      doesErrorOccur: signOutInfo.doesErrorOccur,
      userBuyOfferDetails: state.userBuyOfferDetails,
      userSellOfferDetails: state.userSellOfferDetails,
    };
  } else {
    return {
      userProfileDetails: initializedUserProfileDetails,
      isUserLoggedIn: signOutInfo.isUserLoggedIn,
      message: signOutInfo.message,
      doesErrorOccur: signOutInfo.doesErrorOccur,
      userBuyOfferDetails: [],
      userSellOfferDetails: [],
    };
  }
});
