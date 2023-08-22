import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doUserSignInApiCall,
  doUserSignOutApiCall,
  doUserSignUpApiCall,
  getSignedInUserApiCall,
  placeMyBuyOfferApiCall,
  placeMySellOfferApiCall,
} from "../data-services";
import {
  GET_USER_PROFILE,
  PLACE_USER_BUY_OFFER,
  PLACE_USER_SELL_OFFER,
  RESET_BACKEND_MESSAGE,
  RESET_ERROR_STATE,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGN_UP,
} from "../models/constants";
import { OfferDetails, UserProfileDetails } from "../models/interfaces";
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
  myAllBuyOffersDetails: OfferDetails[];
  myAllSellOffersDetails: OfferDetails[];
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
      myAllBuyOffersDetails: state.myAllBuyOffersDetails,
      myAllSellOffersDetails: state.myAllSellOffersDetails,
    };
  } else {
    // Notify other tabs about the logout
    const logoutChannel = new BroadcastChannel("user-logout");
    logoutChannel.postMessage("logout");
    logoutChannel.close();
    return {
      userProfileDetails: initializedUserProfileDetails,
      isUserLoggedIn: signOutInfo.isUserLoggedIn,
      message: signOutInfo.message,
      doesErrorOccur: signOutInfo.doesErrorOccur,
      myAllBuyOffersDetails: [],
      myAllSellOffersDetails: [],
    };
  }
});

export const placeMyBuyOffer = createAsyncThunk<
  {
    isUserLoggedIn: boolean;
    message: string;
    doesErrorOccur: boolean;
  },
  {
    cryptoCurrency: string;
    paymentMethod: string;
    preferredCurrency: string;
    cryptoCurrencyRate: string;
    minAmount: number;
    maxAmount: number;
    offerMargin: number;
    offersTags: string[];
    offerLocation: string;
    offerOwnerLocation: string;
  }
>(
  PLACE_USER_BUY_OFFER,
  async (buyOffer: {
    cryptoCurrency: string;
    paymentMethod: string;
    preferredCurrency: string;
    cryptoCurrencyRate: string;
    minAmount: number;
    maxAmount: number;
    offerMargin: number;
    offersTags: string[];
    offerLocation: string;
    offerOwnerLocation: string;
  }) => {
    const {
      cryptoCurrency,
      paymentMethod,
      preferredCurrency,
      cryptoCurrencyRate,
      minAmount,
      maxAmount,
      offerMargin,
      offersTags,
      offerLocation,
      offerOwnerLocation,
    } = buyOffer;
    const myBuyOfferInfo = await placeMyBuyOfferApiCall(
      cryptoCurrency,
      paymentMethod,
      preferredCurrency,
      cryptoCurrencyRate,
      minAmount,
      maxAmount,
      offerMargin,
      offersTags,
      offerLocation,
      offerOwnerLocation
    );
    return myBuyOfferInfo;
  }
);

export const placeMySellOffer = createAsyncThunk<
  {
    isUserLoggedIn: boolean;
    message: string;
    doesErrorOccur: boolean;
  },
  {
    cryptoCurrency: string;
    paymentMethod: string;
    preferredCurrency: string;
    cryptoCurrencyRate: string;
    minAmount: number;
    maxAmount: number;
    offerMargin: number;
    offersTags: string[];
    offerLocation: string;
    offerOwnerLocation: string;
  }
>(
  PLACE_USER_SELL_OFFER,
  async (sellOffer: {
    cryptoCurrency: string;
    paymentMethod: string;
    preferredCurrency: string;
    cryptoCurrencyRate: string;
    minAmount: number;
    maxAmount: number;
    offerMargin: number;
    offersTags: string[];
    offerLocation: string;
    offerOwnerLocation: string;
  }) => {
    const {
      cryptoCurrency,
      paymentMethod,
      preferredCurrency,
      cryptoCurrencyRate,
      minAmount,
      maxAmount,
      offerMargin,
      offersTags,
      offerLocation,
      offerOwnerLocation,
    } = sellOffer;
    const mySellOfferInfo = await placeMySellOfferApiCall(
      cryptoCurrency,
      paymentMethod,
      preferredCurrency,
      cryptoCurrencyRate,
      minAmount,
      maxAmount,
      offerMargin,
      offersTags,
      offerLocation,
      offerOwnerLocation
    );
    return mySellOfferInfo;
  }
);
