import {
  USER_SIGN_UP_SUCCESSFUL,
  USER_SIGN_UP_UNSUCCESSFUL,
} from "../models/constants";
import { UserProfileDetails } from "../models/interfaces";

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
): Promise<string> => {
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
    return data.message;
  } else {
    return `${data.user.userName} signed-up successfully`;
  }
};

export const doUserSignInApiCall = async (
  email: string,
  password: string
): Promise<{
  isSuccessfullySignedIn: boolean;
  token: string;
  errorMessage: string;
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
        token: data.token,
        errorMessage: "",
      };
    } else {
      return {
        isSuccessfullySignedIn: false,
        token: "",
        errorMessage: data.message,
      };
    }
  } catch (error: any) {
    return {
      isSuccessfullySignedIn: false,
      token: "",
      errorMessage: error.json().message,
    };
  }
};

export const getSignedInUserApiCall = async (): Promise<{
  error: boolean;
  userProfileDetails?: UserProfileDetails;
}> => {
  const responseData = await fetch(GET_SIGNED_IN_USER_PROFILE_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const data = await responseData.json();
  if (data.error) {
    return {
      error: true,
    };
  } else {
    return {
      error: false,
      userProfileDetails: {
        id: data.id,
        phone: data.phone,
        email: data.email,
        userName: data.userName,
      },
    };
  }
};

export const doUserSignOutApiCall = async (): Promise<boolean> => {
  return fetch(SIGN_OUT_API, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};
