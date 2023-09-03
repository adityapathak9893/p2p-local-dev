export interface AppState {
  isUserLoggedIn: boolean;
  userProfileDetails: UserProfileDetails;
  myAllBuyOffersDetails: OfferDetails[];
  allBuyOfferDetails: OfferDetails[];
  myAllSellOffersDetails: OfferDetails[];
  allSellOfferDetails: OfferDetails[];
  mySubmittedfeedBacks: Feedbacks[];
  myReceivedfeedBacks: Feedbacks[];
  feedBacksReceivedBySelectedUser: Feedbacks[];
  doesErrorOccur: boolean;
  isRequestPending: boolean;
  messageFromBackend: string;
  activeDashBoardTab: string;
  tradeMode: string;
  buyOfferFormDetails: OfferFormDetails;
  sellOfferFormDetails: OfferFormDetails;
}

export interface UserProfileDetails {
  id: string;
  phone: string;
  email: string;
  userName: string;
}

export interface OfferDetails {
  email: string;
  userName: string;
  cryptoCurrency: string;
  paymentMethod: string;
  preferredCurrency: string;
  cryptoCurrencyRate: string;
  minAmount: number | null;
  maxAmount: number | null;
  offerMargin: number | null;
  offersTags: string[];
  offerLocation: string;
  offerOwnerLocation: string;
}

export interface Feedbacks {
  userName: string;
  givenBy_userName: string;
  message: string;
  rating: number;
  createdAt: string;
}

export interface LinkWithLabels {
  label: string;
  linkToPage: string;
}

export interface StepsContent {
  PaymentMethod: JSX.Element[];
  Pricing: JSX.Element[];
  OtherSettings: JSX.Element[];
}

export interface OfferFormDetails {
  cryptoCurrency: string;
  paymentMethod: string;
  preferredCurrency: string;
  money: string;
  offerLocation: string;
  offerOwnerLocation: string;
  errors: { [key: string]: string };
  isFormValid: boolean;
}
