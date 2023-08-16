import {
  AppState,
  UserProfileDetails,
  BuyOfferDetails,
  SellOfferDetails,
} from "../interfaces";

export const initializedUserProfileDetails: UserProfileDetails = {
  id: "",
  phone: "",
  email: "",
  userName: "",
};

export const initializedBuyOfferDetails: BuyOfferDetails = {
  email: "",
  userName: "",
  cryptoCurrency: "",
  spendMoney: null,
  offerLocation: "",
  offerOwnerLocation: "",
  paymentMethod: "",
};

export const initializedSellOfferDetails: SellOfferDetails = {
  email: "",
  userName: "",
  cryptoCurrency: "",
  getMoney: null,
  offerLocation: "",
  offerOwnerLocation: "",
  paymentMethod: "",
};

export const initializedAppState: AppState = {
  isUserLoggedIn: false,
  userProfileDetails: initializedUserProfileDetails,
  userBuyOfferDetails: [],
  allBuyOfferDetails: [],
  userSellOfferDetails: [],
  allSellOfferDetails: [],
  userSignUpInfo: "",
  isRequestPending: false,
  messageFromBackend: "",
};
