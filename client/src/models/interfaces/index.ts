export interface AppState {
  isUserLoggedIn: boolean;
  userProfileDetails: UserProfileDetails;
  myAllBuyOffersDetails: OfferDetails[];
  allBuyOfferDetails: OfferDetails[];
  myAllSellOffersDetails: OfferDetails[];
  allSellOfferDetails: OfferDetails[];
  doesErrorOccur: boolean;
  isRequestPending: boolean;
  messageFromBackend: string;
  activeDashBoardTab: string;
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

export interface LinkWithLabels {
  label: string;
  linkToPage: string;
}

export interface StepsContent {
  PaymentMethod: JSX.Element[];
  Pricing: JSX.Element[];
  OtherSettings: JSX.Element[];
}
