import { BUY, CRYPTOCURRENCY } from "../constants";
import {
  AppState,
  UserProfileDetails,
  OfferDetails,
  OfferFormDetails,
} from "../interfaces";

export const initializedUserProfileDetails: UserProfileDetails = {
  id: "",
  phone: "",
  email: "",
  userName: "",
};

export const initializedOfferDetails: OfferDetails = {
  email: "",
  userName: "",
  cryptoCurrency: "",
  paymentMethod: "",
  preferredCurrency: "",
  cryptoCurrencyRate: "",
  minAmount: null,
  maxAmount: null,
  offerMargin: null,
  offersTags: [],
  offerLocation: "",
  offerOwnerLocation: "",
};

export const initializeOfferFormDetails: OfferFormDetails = {
  cryptoCurrency: CRYPTOCURRENCY,
  paymentMethod: "",
  preferredCurrency: "",
  money: "",
  offerLocation: "",
  offerOwnerLocation: "",
  errors: {},
  isFormValid: false,
};

export const initializedAppState: AppState = {
  isUserLoggedIn: false,
  userProfileDetails: initializedUserProfileDetails,
  myAllBuyOffersDetails: [],
  allBuyOfferDetails: [],
  myAllSellOffersDetails: [],
  allSellOfferDetails: [],
  mySubmittedfeedBacks: [],
  myReceivedfeedBacks: [],
  feedBacksReceivedBySelectedUser: [],
  doesErrorOccur: false,
  isRequestPending: false,
  messageFromBackend: "",
  activeDashBoardTab: "",
  tradeMode: BUY,
  buyOfferFormDetails: initializeOfferFormDetails,
  sellOfferFormDetails: initializeOfferFormDetails,
};
