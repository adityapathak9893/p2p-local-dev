import {
  initializedOfferDetails,
  initializedUserProfileDetails,
} from "../models/initializations";
import { OfferDetails, UserProfileDetails } from "../models/interfaces";

const SIGN_UP_API = `${process.env.REACT_APP_API_HOST}/api/signup`;
const SIGN_IN_API = `${process.env.REACT_APP_API_HOST}/api/signin`;
const GET_SIGNED_IN_USER_PROFILE_API = `${process.env.REACT_APP_API_HOST}/api/getSignedInUserProfile`;
const SIGN_OUT_API = `${process.env.REACT_APP_API_HOST}/api/signout`;
const PLACE_MY_BUY_OFFER_API = `${process.env.REACT_APP_API_HOST}/api/placeMyBuyOffer`;
const GET_MY_BUY_OFFERS_API = `${process.env.REACT_APP_API_HOST}/api/getMyBuyOffers`;
const GET_ALL_BUY_OFFERS_API = `${process.env.REACT_APP_API_HOST}/api/getAllBuyOffers`;
const PLACE_MY_SELL_OFFER_API = `${process.env.REACT_APP_API_HOST}/api/placeMySellOffer`;
const GET_MY_SELL_OFFERS_API = `${process.env.REACT_APP_API_HOST}/api/getMysellOffers`;
const GET_ALL_SELL_OFFERS_API = `${process.env.REACT_APP_API_HOST}/api/getAllSellOffers`;

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
  offerLocation: string,
  offerOwnerLocation: string
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
      offerLocation,
      offerOwnerLocation,
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
  offerLocation: string,
  offerOwnerLocation: string
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
      offerLocation,
      offerOwnerLocation,
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
