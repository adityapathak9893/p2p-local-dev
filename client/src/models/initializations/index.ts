import { BUY, CRYPTOCURRENCY } from "../constants";
import {
  AppState,
  UserProfileDetails,
  OfferDetails,
  OfferFormDetails,
  UserTradeInformation,
} from "../interfaces";

export const initializedUserProfileDetails: UserProfileDetails = {
  id: "",
  phone: "",
  email: "",
  userName: "",
  walletAddress: "",
  userBio: "",
  isPhoneVerified: false,
  isEmailVerified: false,
  location: "",
  languages: "",
  preferredCurrency: "",
  joined: "",
  isOnline: false,
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
  offerTimeLimit: "",
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

export const initializedUserTradeInformation: UserTradeInformation = {
  email: "",
  userName: "",
  tradePartners: 0,
  trades: 0,
  tradeVolume: 0,
  TrustedBy: 0,
  BlockedBy: 0,
  HasBlocked: 0,
};

export const initializedAppState: AppState = {
  isUserLoggedIn: false,
  userProfileDetails: initializedUserProfileDetails,
  loggedInUserTradeInformation: initializedUserTradeInformation,
  userBalance: null,
  myAllBuyOffersDetails: [],
  allBuyOfferDetails: [],
  myAllSellOffersDetails: [],
  allSellOfferDetails: [],
  mySubmittedfeedBacks: [],
  myReceivedfeedBacks: [],
  selectedUserDetails: null,
  doesErrorOccur: false,
  isRequestPending: false,
  messageFromBackend: "",
  activeDashBoardTab: "",
  tradeMode: BUY,
  buyOfferFormDetails: initializeOfferFormDetails,
  sellOfferFormDetails: initializeOfferFormDetails,
};
