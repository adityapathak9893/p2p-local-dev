import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  doSubmitFeedbackApiCall,
  doUserSignInApiCall,
  doUserSignOutApiCall,
  doUserSignUpApiCall,
  fetchBitcoinBalanceAPI,
  getBuyOffersWithFiltersApiCall,
  getFeedbacksReceivedByMeApiCall,
  getFeedbacksSubmittedByMeApiCall,
  getMyBuyOffersApiCall,
  getMySellOffersApiCall,
  getSellOffersWithFiltersApiCall,
  getSignedInUserApiCall,
  placeMyBuyOfferApiCall,
  placeMySellOfferApiCall,
  sendWithdrawalNotificationAPI,
  getSelectedUserDetailsApiCall,
} from "../data-services";
import {
  DO_SUBMIT_FEEDBACK,
  GET_FEEDBACKS_RECEIVED_TO_ME,
  GET_FEEDBACKS_SUBMITTED_BY_ME,
  GET_FILTERED_BUY_OFFERS,
  GET_FILTERED_SELL_OFFERS,
  GET_SELECTED_USER_DETAILS,
  GET_USER_BALANCE,
  GET_USER_BUY_OFFERS,
  GET_USER_PROFILE,
  GET_USER_SELL_OFFERS,
  PLACE_USER_BUY_OFFER,
  PLACE_USER_SELL_OFFER,
  RESET_BACKEND_MESSAGE,
  RESET_ERROR_STATE,
  SEND_WITHDRAWAL_NOTIFICATION,
  SET_BUY_OFFERS_FORM_DETAILS,
  SET_DASHBOARD_TAB,
  SET_SELL_OFFERS_FORM_DETAILS,
  SET_TRADE_MODE,
  USER_SIGN_IN,
  USER_SIGN_OUT,
  USER_SIGN_UP,
} from "../models/constants";
import {
  Feedbacks,
  OfferDetails,
  UserProfileDetails,
  OfferFormDetails,
  SelectedUserDetails,
} from "../models/interfaces";
import { initializedUserProfileDetails } from "../models/initializations";
import { RootState } from "../reducers/store";

export const setTradeMode = createAction(
  SET_TRADE_MODE,
  (tradeMode: string) => ({
    payload: tradeMode,
  })
);

export const setBuyOfferFormDetails = createAction(
  SET_BUY_OFFERS_FORM_DETAILS,
  (buyOfferFormDetails: OfferFormDetails) => ({
    payload: buyOfferFormDetails,
  })
);

export const setSellOfferFormDetails = createAction(
  SET_SELL_OFFERS_FORM_DETAILS,
  (sellOfferFormDetails: OfferFormDetails) => ({
    payload: sellOfferFormDetails,
  })
);

export const resetBackendMessage = createAction(RESET_BACKEND_MESSAGE, () => ({
  payload: "",
}));

export const resetErrorState = createAction(RESET_ERROR_STATE, () => ({
  payload: false,
}));

export const setDashBoardTab = createAction(
  SET_DASHBOARD_TAB,
  (tabValue: string) => ({
    payload: tabValue,
  })
);

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
    offerTimeLimit: string;
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
    offerTimeLimit: string;
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
      offerTimeLimit,
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
      offerTimeLimit
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
    offerTimeLimit: string;
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
    offerTimeLimit: string;
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
      offerTimeLimit,
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
      offerTimeLimit
    );
    return mySellOfferInfo;
  }
);

export const getMyBuyOffers = createAsyncThunk<{
  message: string;
  doesErrorOccur: boolean;
  myAllBuyOffersDetails: OfferDetails[];
}>(GET_USER_BUY_OFFERS, async () => {
  const myBuyOffersDetails = await getMyBuyOffersApiCall();
  return myBuyOffersDetails;
});

export const getMySellOffers = createAsyncThunk<{
  message: string;
  doesErrorOccur: boolean;
  myAllSellOffersDetails: OfferDetails[];
}>(GET_USER_SELL_OFFERS, async () => {
  const mySellOffersDetails = await getMySellOffersApiCall();
  return mySellOffersDetails;
});

export const getBuyOffersWithFilters = createAsyncThunk<
  {
    message: string;
    doesErrorOccur: boolean;
    allBuyOfferDetails: OfferDetails[];
  },
  {
    cryptoCurrency: string;
    minAmount: number;
    preferredCurrency: string;
    paymentMethod: string;
    location: string;
    page: number;
  }
>(
  GET_FILTERED_BUY_OFFERS,
  async (formDetails: {
    cryptoCurrency: string;
    minAmount: number;
    preferredCurrency: string;
    paymentMethod: string;
    location: string;
    page: number;
  }) => {
    const {
      cryptoCurrency,
      minAmount,
      preferredCurrency,
      paymentMethod,
      location,
      page,
    } = formDetails;
    const allBuyOffersDetails = await getBuyOffersWithFiltersApiCall(
      cryptoCurrency,
      minAmount,
      preferredCurrency,
      paymentMethod,
      location,
      page
    );
    return allBuyOffersDetails;
  }
);

export const getSellOffersWithFilters = createAsyncThunk<
  {
    message: string;
    doesErrorOccur: boolean;
    allSellOfferDetails: OfferDetails[];
  },
  {
    cryptoCurrency: string;
    minAmount: number;
    preferredCurrency: string;
    paymentMethod: string;
    location: string;
    page: number;
  }
>(
  GET_FILTERED_SELL_OFFERS,
  async (formDetails: {
    cryptoCurrency: string;
    minAmount: number;
    preferredCurrency: string;
    paymentMethod: string;
    location: string;
    page: number;
  }) => {
    const {
      cryptoCurrency,
      minAmount,
      preferredCurrency,
      paymentMethod,
      location,
      page,
    } = formDetails;
    const allSellOffersDetails = await getSellOffersWithFiltersApiCall(
      cryptoCurrency,
      minAmount,
      preferredCurrency,
      paymentMethod,
      location,
      page
    );
    return allSellOffersDetails;
  }
);

export const doSubmitFeedback = createAsyncThunk<
  { message: string; doesErrorOccur: boolean },
  {
    email: string;
    userName: string;
    message: string;
    rating: number;
  }
>(
  DO_SUBMIT_FEEDBACK,
  async (dataToBeSubmitted: {
    email: string;
    userName: string;
    message: string;
    rating: number;
  }) => {
    const submitFeedbackInfo = await doSubmitFeedbackApiCall(
      dataToBeSubmitted.email,
      dataToBeSubmitted.userName,
      dataToBeSubmitted.message,
      dataToBeSubmitted.rating
    );
    return submitFeedbackInfo;
  }
);

export const getFeedbacksSubmittedByMe = createAsyncThunk<{
  message: string;
  doesErrorOccur: boolean;
  mySubmittedfeedBacks: Feedbacks[];
}>(GET_FEEDBACKS_SUBMITTED_BY_ME, async () => {
  const feedBacksSubmittedByMe = await getFeedbacksSubmittedByMeApiCall();
  return feedBacksSubmittedByMe;
});

export const getFeedbacksReceivedByMe = createAsyncThunk<{
  message: string;
  doesErrorOccur: boolean;
  myReceivedfeedBacks: Feedbacks[];
}>(GET_FEEDBACKS_RECEIVED_TO_ME, async () => {
  const feedBacksReceivedByMe = await getFeedbacksReceivedByMeApiCall();
  return feedBacksReceivedByMe;
});

export const getSelectedUserDetails = createAsyncThunk<
  {
    message: string;
    doesErrorOccur: boolean;
    selectedUserDetails: SelectedUserDetails | null;
  },
  string
>(GET_SELECTED_USER_DETAILS, async (selectedUserEmail: string) => {
  const selectedUserDetails = await getSelectedUserDetailsApiCall(
    selectedUserEmail
  );
  return selectedUserDetails;
});

export const getUserBalance = createAsyncThunk<
  {
    userBalance: number | null;
  },
  string
>(GET_USER_BALANCE, async (walletAddress: string) => {
  const userBalanceDetails = await fetchBitcoinBalanceAPI(walletAddress);
  return { userBalance: userBalanceDetails };
});

export const sendWithdrawalNotification = createAsyncThunk<
  {
    message: string;
    doesErrorOccur: boolean;
  },
  {
    userName: string;
    amount: string;
    walletAddress: string;
  }
>(
  SEND_WITHDRAWAL_NOTIFICATION,
  async (reqDetails: {
    userName: string;
    amount: string;
    walletAddress: string;
  }) => {
    const { userName, amount, walletAddress } = reqDetails;
    const submissionDetails = await sendWithdrawalNotificationAPI(
      userName,
      amount,
      walletAddress
    );
    return submissionDetails;
  }
);
