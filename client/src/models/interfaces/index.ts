export interface AppState {
  isUserLoggedIn: boolean;
  userProfileDetails: UserProfileDetails;
  userBuyOfferDetails: BuyOfferDetails[];
  allBuyOfferDetails: BuyOfferDetails[];
  userSellOfferDetails: SellOfferDetails[];
  allSellOfferDetails: SellOfferDetails[];
  userSignUpInfo: string;
  isRequestPending: boolean;
  errorMessage: string;
}

export interface UserProfileDetails {
  id: string;
  phone: string;
  email: string;
  userName: string;
}

export interface BuyOfferDetails {
  email: string;
  userName: string;
  cryptoCurrency: string;
  spendMoney: number | null;
  offerLocation: string;
  offerOwnerLocation: string;
  paymentMethod: string;
}

export interface SellOfferDetails {
  email: string;
  userName: string;
  cryptoCurrency: string;
  getMoney: number | null;
  offerLocation: string;
  offerOwnerLocation: string;
  paymentMethod: string;
}
