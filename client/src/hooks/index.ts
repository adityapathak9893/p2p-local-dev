import { useDispatch, useSelector } from "react-redux";
import {
  doUserSignUp,
  doUserSignIn,
  getSignedInUser,
  doUserSignOut,
  resetBackendMessage,
  resetErrorState,
  placeMyBuyOffer,
  placeMySellOffer,
} from "../actions";
import { AppDispatch, RootState } from "../reducers/store";

export const useStateSelector = () => ({
  isRequestPending: useSelector((state: RootState) => state.isRequestPending),
  isUserLoggedIn: useSelector((state: RootState) => state.isUserLoggedIn),
  userProfileDetails: useSelector(
    (state: RootState) => state.userProfileDetails
  ),
  myAllBuyOffersDetails: useSelector(
    (state: RootState) => state.myAllBuyOffersDetails
  ),
  allBuyOfferDetails: useSelector(
    (state: RootState) => state.allBuyOfferDetails
  ),
  myAllSellOffersDetails: useSelector(
    (state: RootState) => state.myAllSellOffersDetails
  ),
  allSellOfferDetails: useSelector(
    (state: RootState) => state.allSellOfferDetails
  ),
  messageFromBackend: useSelector(
    (state: RootState) => state.messageFromBackend
  ),
  doesErrorOccur: useSelector((state: RootState) => state.doesErrorOccur),
});

export const useActionDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return {
    doUserSignUp: (phone: string, email: string, password: string) =>
      dispatch(doUserSignUp({ phone, email, password })),
    doUserSignIn: (email: string, password: string) =>
      dispatch(doUserSignIn({ email, password })),
    getSignedInUser: () => dispatch(getSignedInUser()),
    doUserSignOut: () => dispatch(doUserSignOut()),
    resetBackendMessage: () => dispatch(resetBackendMessage()),
    resetErrorState: () => dispatch(resetErrorState()),
    placeMyBuyOffer: (
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
    ) =>
      dispatch(
        placeMyBuyOffer({
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
        })
      ),
    placeMySellOffer: (
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
    ) =>
      dispatch(
        placeMySellOffer({
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
        })
      ),
  };
};
