import { createReducer, PayloadAction } from "@reduxjs/toolkit";
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
import { initializedAppState } from "../models/initializations";
import {
  AppState,
  Feedbacks,
  OfferDetails,
  UserProfileDetails,
} from "../models/interfaces";

const AppReducer = createReducer(initializedAppState, (app) => {
  app
    .addCase(setTradeMode, (state, action) => {
      state.tradeMode = action.payload;
    })
    .addCase(setBuyOfferFormDetails, (state, action) => {
      state.buyOfferFormDetails = action.payload;
    })
    .addCase(setSellOfferFormDetails, (state, action) => {
      state.sellOfferFormDetails = action.payload;
    })
    .addCase(setDashBoardTab, (state, action) => {
      state.activeDashBoardTab = action.payload;
    })
    .addCase(resetErrorState, (state, action) => {
      state.doesErrorOccur = action.payload;
    })
    .addCase(resetBackendMessage, (state, action) => {
      state.messageFromBackend = action.payload;
    })
    .addCase(
      doUserSignUp.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      doUserSignUp.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      doUserSignUp.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      doUserSignIn.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      doUserSignIn.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      doUserSignIn.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          isUserLoggedIn: boolean;
          doesErrorOccur: boolean;
          message: string;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        doesErrorOccur: payload.doesErrorOccur,
        isUserLoggedIn: payload.isUserLoggedIn,
        messageFromBackend: payload.message,
      })
    )
    .addCase(
      getSignedInUser.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getSignedInUser.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getSignedInUser.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          userProfileDetails: UserProfileDetails;
          isUserLoggedIn: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
        userProfileDetails: payload.userProfileDetails,
        isUserLoggedIn: payload.isUserLoggedIn,
      })
    )
    .addCase(
      doUserSignOut.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      doUserSignOut.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      doUserSignOut.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          userProfileDetails: UserProfileDetails;
          myAllBuyOffersDetails: OfferDetails[];
          myAllSellOffersDetails: OfferDetails[];
          isUserLoggedIn: boolean;
          message: string;
          doesErrorOccur: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        userProfileDetails: payload.userProfileDetails,
        myAllBuyOffersDetails: payload.myAllBuyOffersDetails,
        myAllSellOffersDetails: payload.myAllSellOffersDetails,
        isUserLoggedIn: payload.isUserLoggedIn,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
        activeDashBoardTab: "",
        userBalance: null,
      })
    )
    .addCase(
      placeMyBuyOffer.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      placeMyBuyOffer.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      placeMyBuyOffer.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          isUserLoggedIn: boolean;
          message: string;
          doesErrorOccur: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        isUserLoggedIn: payload.isUserLoggedIn,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      placeMySellOffer.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      placeMySellOffer.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      placeMySellOffer.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          isUserLoggedIn: boolean;
          message: string;
          doesErrorOccur: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        isUserLoggedIn: payload.isUserLoggedIn,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getMyBuyOffers.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getMyBuyOffers.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getMyBuyOffers.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          myAllBuyOffersDetails: OfferDetails[];
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        myAllBuyOffersDetails: payload.myAllBuyOffersDetails,
        //messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getMySellOffers.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getMySellOffers.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getMySellOffers.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          myAllSellOffersDetails: OfferDetails[];
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        myAllSellOffersDetails: payload.myAllSellOffersDetails,
        //messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getBuyOffersWithFilters.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getBuyOffersWithFilters.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getBuyOffersWithFilters.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          allBuyOfferDetails: OfferDetails[];
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        allBuyOfferDetails: payload.allBuyOfferDetails,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getSellOffersWithFilters.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getSellOffersWithFilters.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getSellOffersWithFilters.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          allSellOfferDetails: OfferDetails[];
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        allSellOfferDetails: payload.allSellOfferDetails,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      doSubmitFeedback.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      doSubmitFeedback.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      doSubmitFeedback.fulfilled,
      (
        state: AppState,
        { payload }: PayloadAction<{ message: string; doesErrorOccur: boolean }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getFeedbacksSubmittedByMe.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getFeedbacksSubmittedByMe.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getFeedbacksSubmittedByMe.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          mySubmittedfeedBacks: Feedbacks[];
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        mySubmittedfeedBacks: payload.mySubmittedfeedBacks,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getFeedbacksReceivedByMe.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getFeedbacksReceivedByMe.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getFeedbacksReceivedByMe.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          myReceivedfeedBacks: Feedbacks[];
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        myReceivedfeedBacks: payload.myReceivedfeedBacks,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getUserFeedback.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getUserFeedback.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getUserFeedback.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
          feedBacksReceivedBySelectedUser: Feedbacks[];
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        feedBacksReceivedBySelectedUser:
          payload.feedBacksReceivedBySelectedUser,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    )
    .addCase(
      getUserBalance.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      getUserBalance.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      getUserBalance.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          userBalance: number | null;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        userBalance: payload.userBalance,
      })
    )
    .addCase(
      sendWithdrawalNotification.pending,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: true,
      })
    )
    .addCase(
      sendWithdrawalNotification.rejected,
      (state: AppState): AppState => ({
        ...state,
        isRequestPending: false,
      })
    )
    .addCase(
      sendWithdrawalNotification.fulfilled,
      (
        state: AppState,
        {
          payload,
        }: PayloadAction<{
          message: string;
          doesErrorOccur: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    );
});

export default AppReducer;
