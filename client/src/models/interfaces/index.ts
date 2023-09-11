export interface AppState {
  isUserLoggedIn: boolean;
  userProfileDetails: UserProfileDetails;
  loggedInUserTradeInformation: UserTradeInformation;
  userBalance: number | null;
  myAllBuyOffersDetails: OfferDetails[];
  allBuyOfferDetails: OfferDetails[];
  myAllSellOffersDetails: OfferDetails[];
  allSellOfferDetails: OfferDetails[];
  mySubmittedfeedBacks: Feedbacks[];
  myReceivedfeedBacks: Feedbacks[];
  selectedUserDetails: SelectedUserDetails | null;
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
  walletAddress: string;
  userBio: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  location: string;
  languages: string;
  preferredCurrency: string;
  joined: string;
  isOnline: boolean;
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
  offerTimeLimit: string;
  offerOwnerLocation: string;
}

export interface Feedbacks {
  email: string;
  userName: string;
  givenBy_userEmail: string;
  givenBy_userName: string;
  givenBy_userName_location: string;
  message: string;
  rating: number;
  isFeedBackPositive: boolean;
  createdAt: string;
}

export interface SelectedUserDetails {
  phone: string;
  email: string;
  userName: string;
  userBio: string;
  isPhoneVerified: boolean;
  isEmailVerified: boolean;
  location: string;
  languages: string;
  preferredCurrency: string;
  joined: string;
  isOnline: boolean;
  userTradeInformation: UserTradeInformation[];
  feedbacks: Feedbacks[];
  buyOffers: OfferDetails[];
  sellOffers: OfferDetails[];
}

export interface UserTradeInformation {
  email: string;
  userName: string;
  tradePartners: number;
  trades: number;
  tradeVolume: number;
  TrustedBy: number;
  BlockedBy: number;
  HasBlocked: number;
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
