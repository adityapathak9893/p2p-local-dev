import { BOT_TOKEN, CHAT_ID } from "../models/constants";
import { initializedUserProfileDetails } from "../models/initializations";
import {
  Feedbacks,
  OfferDetails,
  SelectedUserDetails,
  UserProfileDetails,
} from "../models/interfaces";

const SIGN_UP_API = `${process.env.REACT_APP_API_HOST}/api/signup`;
const SIGN_IN_API = `${process.env.REACT_APP_API_HOST}/api/signin`;
const GET_SIGNED_IN_USER_PROFILE_API = `${process.env.REACT_APP_API_HOST}/api/getSignedInUserProfile`;
const SIGN_OUT_API = `${process.env.REACT_APP_API_HOST}/api/signout`;
const PLACE_MY_BUY_OFFER_API = `${process.env.REACT_APP_API_HOST}/api/placeMyBuyOffer`;
const GET_MY_BUY_OFFERS_API = `${process.env.REACT_APP_API_HOST}/api/getMyBuyOffers`;
const GET_BUY_OFFERS_FILTERS_API = `${process.env.REACT_APP_API_HOST}/api/getBuyOffersWithFilters`;
const PLACE_MY_SELL_OFFER_API = `${process.env.REACT_APP_API_HOST}/api/placeMySellOffer`;
const GET_MY_SELL_OFFERS_API = `${process.env.REACT_APP_API_HOST}/api/getMysellOffers`;
const GET_SELL_OFFERS_FILTERS_API = `${process.env.REACT_APP_API_HOST}/api/getSellOffersWithFilters`;
const SUBMIT_FEEDBACK = `${process.env.REACT_APP_API_HOST}/api/submitFeedback`;
const GET_FEEDBACKS_SUBMITTED_BY_ME = `${process.env.REACT_APP_API_HOST}/api/getFeedbacksSubmittedByMe`;
const GET_FEEDBACKS_RECEIVED_BY_ME = `${process.env.REACT_APP_API_HOST}/api/getFeedbacksReceivedToMe`;
const GET_SELECTED_USER_DETAILS = `${process.env.REACT_APP_API_HOST}/api/getSelectedUserDetails`;
const GET_USER_WALLET_BALANCE = `https://blockchain.info/q/addressbalance/`;

export const doUserSignUpApiCall = async (
  phone: string,
  email: string,
  password: string
): Promise<{
  message: string;
  doesErrorOccur: boolean;
}> => {
  const responseData = await fetch(SIGN_UP_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone,
      email,
      password,
      userName: email.split("@")[0],
    }),
  });

  const data = await responseData.json();
  if (data.auth === false || data.success === false) {
    return {
      message: data.message,
      doesErrorOccur: true,
    };
  } else {
    return {
      message: `${data.user.userName} signed-up successfully`,
      doesErrorOccur: false,
    };
  }
};

export const doUserSignInApiCall = async (
  email: string,
  password: string
): Promise<{
  isSuccessfullySignedIn: boolean;
  doesErrorOccur: boolean;
  message: string;
}> => {
  const responseData = await fetch(SIGN_IN_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await responseData.json();

  try {
    if (data.isAuth) {
      return {
        isSuccessfullySignedIn: true,
        doesErrorOccur: false,
        message: "",
      };
    } else {
      return {
        isSuccessfullySignedIn: false,
        doesErrorOccur: true,
        message: data.message,
      };
    }
  } catch (error: any) {
    return {
      isSuccessfullySignedIn: false,
      doesErrorOccur: false,
      message: error.json().message,
    };
  }
};

export const getSignedInUserApiCall = async (
  message: string,
  doesErrorOccur: boolean
): Promise<{
  message: string;
  doesErrorOccur: boolean;
  userProfileDetails: UserProfileDetails;
  isUserLoggedIn: boolean;
}> => {
  const responseData = await fetch(GET_SIGNED_IN_USER_PROFILE_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await responseData.json();
  if (data.isAuth) {
    return {
      message: `${data.userName}'s profile fetched successfully`,
      doesErrorOccur: false,
      userProfileDetails: {
        id: data.id,
        phone: data.phone,
        email: data.email,
        userName: data.userName,
        walletAddress: data.walletAddress,
        userBio: data.userBio,
        isPhoneVerified: data.isPhoneVerified,
        isEmailVerified: data.isEmailVerified,
        location: data.location,
        languages: data.languages,
        preferredCurrency: data.preferredCurrency,
        joined: data.joined,
        isOnline: data.isOnline,
      },
      isUserLoggedIn: true,
    };
  } else if (data.isAuth === false) {
    return {
      message,
      doesErrorOccur,
      userProfileDetails: initializedUserProfileDetails,
      isUserLoggedIn: false,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      userProfileDetails: initializedUserProfileDetails,
      isUserLoggedIn: false,
    };
  }
};

export const doUserSignOutApiCall = async (): Promise<{
  isUserLoggedIn: boolean;
  message: string;
  doesErrorOccur: boolean;
}> => {
  const reponse = await fetch(SIGN_OUT_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await reponse.json();

  if (data.isAuth === false) {
    return {
      isUserLoggedIn: false,
      message: data.message,
      doesErrorOccur: true,
    };
  } else if (data.error) {
    return {
      isUserLoggedIn: true,
      message: data.message,
      doesErrorOccur: true,
    };
  }
  return {
    isUserLoggedIn: false,
    message: data.message,
    doesErrorOccur: false,
  };
};

export const placeMyBuyOfferApiCall = async (
  cryptoCurrency: string,
  paymentMethod: string,
  preferredCurrency: string,
  cryptoCurrencyRate: string,
  minAmount: number,
  maxAmount: number,
  offerMargin: number,
  offersTags: string[],
  offerTimeLimit: string
): Promise<{
  isUserLoggedIn: boolean;
  message: string;
  doesErrorOccur: boolean;
}> => {
  const reponse = await fetch(PLACE_MY_BUY_OFFER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      cryptoCurrency,
      paymentMethod,
      preferredCurrency,
      cryptoCurrencyRate,
      minAmount,
      maxAmount,
      offerMargin,
      offersTags,
      offerTimeLimit,
    }),
  });

  const data = await reponse.json();

  if (data.success) {
    return {
      message:
        "You have successfully palced your buy offer. You can see it on my offers tab under user dashboard",
      doesErrorOccur: false,
      isUserLoggedIn: true,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      isUserLoggedIn: false,
    };
  }
};

export const placeMySellOfferApiCall = async (
  cryptoCurrency: string,
  paymentMethod: string,
  preferredCurrency: string,
  cryptoCurrencyRate: string,
  minAmount: number,
  maxAmount: number,
  offerMargin: number,
  offersTags: string[],
  offerTimeLimit: string
): Promise<{
  isUserLoggedIn: boolean;
  message: string;
  doesErrorOccur: boolean;
}> => {
  const reponse = await fetch(PLACE_MY_SELL_OFFER_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      cryptoCurrency,
      paymentMethod,
      preferredCurrency,
      cryptoCurrencyRate,
      minAmount,
      maxAmount,
      offerMargin,
      offersTags,
      offerTimeLimit,
    }),
  });

  const data = await reponse.json();

  if (data.success) {
    return {
      message:
        "You have successfully palced your sell offer. You can see it on my offers tab under user dashboard",
      doesErrorOccur: false,
      isUserLoggedIn: true,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      isUserLoggedIn: false,
    };
  }
};

export const getMyBuyOffersApiCall = async (): Promise<{
  message: string;
  doesErrorOccur: boolean;
  myAllBuyOffersDetails: OfferDetails[];
}> => {
  const reponse = await fetch(GET_MY_BUY_OFFERS_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await reponse.json();

  if (!!data.success) {
    return {
      message: "",
      doesErrorOccur: false,
      myAllBuyOffersDetails: data.buyOffers,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      myAllBuyOffersDetails: [],
    };
  }
};

export const getMySellOffersApiCall = async (): Promise<{
  message: string;
  doesErrorOccur: boolean;
  myAllSellOffersDetails: OfferDetails[];
}> => {
  const reponse = await fetch(GET_MY_SELL_OFFERS_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const data = await reponse.json();

  if (!!data.success) {
    return {
      message: "",
      doesErrorOccur: false,
      myAllSellOffersDetails: data.sellOffers,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      myAllSellOffersDetails: [],
    };
  }
};

export const getBuyOffersWithFiltersApiCall = async (
  cryptoCurrency: string,
  minAmount: number,
  preferredCurrency: string,
  paymentMethod: string,
  location: string,
  page: number
): Promise<{
  message: string;
  doesErrorOccur: boolean;
  allBuyOfferDetails: OfferDetails[];
}> => {
  const reponse = await fetch(
    GET_BUY_OFFERS_FILTERS_API +
      `?cryptoCurrency=${cryptoCurrency}&minAmount=${minAmount}&preferredCurrency=${preferredCurrency}&paymentMethod=${paymentMethod}&location=${location}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await reponse.json();

  if (data.success) {
    return {
      message: "",
      doesErrorOccur: false,
      allBuyOfferDetails: data.buyOffers,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      allBuyOfferDetails: [],
    };
  }
};

export const getSellOffersWithFiltersApiCall = async (
  cryptoCurrency: string,
  minAmount: number,
  preferredCurrency: string,
  paymentMethod: string,
  location: string,
  page: number
): Promise<{
  message: string;
  doesErrorOccur: boolean;
  allSellOfferDetails: OfferDetails[];
}> => {
  const reponse = await fetch(
    GET_SELL_OFFERS_FILTERS_API +
      `?cryptoCurrency=${cryptoCurrency}&minAmount=${minAmount}&preferredCurrency=${preferredCurrency}&paymentMethod=${paymentMethod}&location=${location}&page=${page}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await reponse.json();

  if (data.success) {
    return {
      message: "",
      doesErrorOccur: false,
      allSellOfferDetails: data.sellOffers,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      allSellOfferDetails: [],
    };
  }
};

export const doSubmitFeedbackApiCall = async (
  email: string,
  userName: string,
  message: string,
  rating: number
): Promise<{ message: string; doesErrorOccur: boolean }> => {
  const reponse = await fetch(SUBMIT_FEEDBACK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      userName,
      message,
      rating,
    }),
  });

  const data = await reponse.json();

  if (data.success) {
    return { message: data.message, doesErrorOccur: false };
  } else {
    return { message: data.message, doesErrorOccur: true };
  }
};

export const getFeedbacksSubmittedByMeApiCall = async (): Promise<{
  message: string;
  doesErrorOccur: boolean;
  mySubmittedfeedBacks: Feedbacks[];
}> => {
  const reponse = await fetch(GET_FEEDBACKS_SUBMITTED_BY_ME, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await reponse.json();

  if (data.success) {
    return {
      message: "",
      doesErrorOccur: false,
      mySubmittedfeedBacks: data.feedbacks,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      mySubmittedfeedBacks: [],
    };
  }
};

export const getFeedbacksReceivedByMeApiCall = async (): Promise<{
  message: string;
  doesErrorOccur: boolean;
  myReceivedfeedBacks: Feedbacks[];
}> => {
  const reponse = await fetch(GET_FEEDBACKS_RECEIVED_BY_ME, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await reponse.json();

  if (data.success) {
    return {
      message: "",
      doesErrorOccur: false,
      myReceivedfeedBacks: data.feedbacks,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      myReceivedfeedBacks: [],
    };
  }
};

export const getSelectedUserDetailsApiCall = async (
  selectedUserEmail: string
): Promise<{
  message: string;
  doesErrorOccur: boolean;
  selectedUserDetails: SelectedUserDetails | null;
}> => {
  const reponse = await fetch(
    GET_SELECTED_USER_DETAILS + `?selectedUserEmail=${selectedUserEmail}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const data = await reponse.json();

  if (data.success) {
    return {
      message: "",
      doesErrorOccur: false,
      selectedUserDetails: data.userDetails,
    };
  } else {
    return {
      message: data.message,
      doesErrorOccur: true,
      selectedUserDetails: null,
    };
  }
};

export const fetchBitcoinBalanceAPI = async (
  walletAddress: string
): Promise<number | null> => {
  try {
    const response = await fetch(GET_USER_WALLET_BALANCE + `${walletAddress}`);

    const balance = await response.json();
    return balance === 0 ? balance : balance / 100000000;
  } catch (error) {
    console.error("Error fetching Bitcoin balance:", error);
    return null;
  }
};

export const sendWithdrawalNotificationAPI = async (
  userName: string,
  amount: string,
  walletAddress: string
): Promise<{
  message: string;
  doesErrorOccur: boolean;
}> => {
  const message = `Withdrawal request raised by ${userName} for the amount of ${amount} BTC. This needs to be deposited at the wallet address ${walletAddress}`;
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const data = {
    chat_id: CHAT_ID,
    text: message,
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return {
        message: "Withdrawal request has been submitted successfuly",
        doesErrorOccur: false,
      };
    } else {
      return {
        message: "Failed to submit the request. Please try again",
        doesErrorOccur: true,
      };
    }
  } catch (error) {
    return {
      message: "Unknown error occured",
      doesErrorOccur: true,
    };
  }
};
