import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  doUserSignIn,
  doUserSignOut,
  doUserSignUp,
  getMyBuyOffers,
  getMySellOffers,
  getSignedInUser,
  placeMyBuyOffer,
  placeMySellOffer,
  resetBackendMessage,
  resetErrorState,
  setDashBoardTab,
} from "../actions";
import { initializedAppState } from "../models/initializations";
import {
  AppState,
  OfferDetails,
  UserProfileDetails,
} from "../models/interfaces";

const AppReducer = createReducer(initializedAppState, (app) => {
  app
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
        messageFromBackend: payload.message,
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
        messageFromBackend: payload.message,
        doesErrorOccur: payload.doesErrorOccur,
      })
    );
});

export default AppReducer;
