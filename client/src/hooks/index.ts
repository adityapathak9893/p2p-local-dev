import { useDispatch, useSelector } from "react-redux";
import {
  doSubmitFeedback,
  doUserSignIn,
  doUserSignOut,
  doUserSignUp,
  getBuyOffersWithFilters,
  getFeedbacksReceivedByMe,
  getFeedbacksSubmittedByMe,
  getMyBuyOffers,
  getMySellOffers,
  getSellOffersWithFilters,
  getSignedInUser,
  getUserBalance,
  getUserFeedback,
  placeMyBuyOffer,
  placeMySellOffer,
  resetBackendMessage,
  resetErrorState,
  sendWithdrawalNotification,
  setBuyOfferFormDetails,
  setDashBoardTab,
  setSellOfferFormDetails,
  setTradeMode,
} from "../actions";
import { OfferFormDetails } from "../models/interfaces";
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
  mySubmittedfeedBacks: useSelector(
    (state: RootState) => state.mySubmittedfeedBacks
  ),
  myReceivedfeedBacks: useSelector(
    (state: RootState) => state.myReceivedfeedBacks
  ),
  feedBacksReceivedBySelectedUser: useSelector(
    (state: RootState) => state.feedBacksReceivedBySelectedUser
  ),
  messageFromBackend: useSelector(
    (state: RootState) => state.messageFromBackend
  ),
  tradeMode: useSelector((state: RootState) => state.tradeMode),
  buyOfferFormDetails: useSelector(
    (state: RootState) => state.buyOfferFormDetails
  ),
  sellOfferFormDetails: useSelector(
    (state: RootState) => state.sellOfferFormDetails
  ),
  doesErrorOccur: useSelector((state: RootState) => state.doesErrorOccur),
  activeDashBoardTab: useSelector(
    (state: RootState) => state.activeDashBoardTab
  ),
  userBalance: useSelector((state: RootState) => state.userBalance),
});

export const useActionDispatch = () => {
  const dispatch = useDispatch<AppDispatch>();
  return {
    doUserSignUp: (
      phone: string,
      email: string,
      password: string,
      walletAddress: string
    ) => dispatch(doUserSignUp({ phone, email, password, walletAddress })),
    doUserSignIn: (email: string, password: string) =>
      dispatch(doUserSignIn({ email, password })),
    getSignedInUser: () => dispatch(getSignedInUser()),
    doUserSignOut: () => dispatch(doUserSignOut()),
    resetBackendMessage: () => dispatch(resetBackendMessage()),
    resetErrorState: () => dispatch(resetErrorState()),
    setTradeMode: (tradeMode: string) => dispatch(setTradeMode(tradeMode)),
    setBuyOfferFormDetails: (buyOfferFormDetails: OfferFormDetails) =>
      dispatch(setBuyOfferFormDetails(buyOfferFormDetails)),
    setSellOfferFormDetails: (sellOfferFormDetails: OfferFormDetails) =>
      dispatch(setSellOfferFormDetails(sellOfferFormDetails)),
    getMyBuyOffers: () => dispatch(getMyBuyOffers()),
    getMySellOffers: () => dispatch(getMySellOffers()),
    getUserBalance: (walletAddress: string) =>
      dispatch(getUserBalance(walletAddress)),
    sendWithdrawalNotification: (
      userName: string,
      amount: string,
      walletAddress: string
    ) =>
      dispatch(
        sendWithdrawalNotification({
          userName,
          amount,
          walletAddress,
        })
      ),
    setDashBoardTab: (tabValue: string) => dispatch(setDashBoardTab(tabValue)),
    getBuyOffersWithFilters: (
      cryptoCurrency: string,
      minAmount: number,
      preferredCurrency: string,
      paymentMethod: string,
      offerLocation: string,
      offerOwnerLocation: string
    ) =>
      dispatch(
        getBuyOffersWithFilters({
          cryptoCurrency,
          minAmount,
          preferredCurrency,
          paymentMethod,
          offerLocation,
          offerOwnerLocation,
        })
      ),
    getSellOffersWithFilters: (
      cryptoCurrency: string,
      minAmount: number,
      preferredCurrency: string,
      paymentMethod: string,
      offerLocation: string,
      offerOwnerLocation: string
    ) =>
      dispatch(
        getSellOffersWithFilters({
          cryptoCurrency,
          minAmount,
          preferredCurrency,
          paymentMethod,
          offerLocation,
          offerOwnerLocation,
        })
      ),
    doSubmitFeedback: (userName: string, message: string, rating: number) =>
      dispatch(
        doSubmitFeedback({
          userName,
          message,
          rating,
        })
      ),
    getFeedbacksSubmittedByMe: () => dispatch(getFeedbacksSubmittedByMe()),
    getFeedbacksReceivedByMe: () => dispatch(getFeedbacksReceivedByMe()),
    getUserFeedback: (selectedUserName: string) =>
      dispatch(getUserFeedback(selectedUserName)),
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
