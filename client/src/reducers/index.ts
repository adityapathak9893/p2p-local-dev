import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  doUserSignIn,
  doUserSignOut,
  doUserSignUp,
  getSignedInUser,
  resetBackendMessage,
} from "../actions";
import { initializedAppState } from "../models/initializations";
import {
  AppState,
  BuyOfferDetails,
  SellOfferDetails,
  UserProfileDetails,
} from "../models/interfaces";

const AppReducer = createReducer(initializedAppState, (app) => {
  app
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
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        messageFromBackend: payload.message,
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
          errorMessage: string;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        userSignUpInfo: "",
        isUserLoggedIn: payload.isUserLoggedIn,
        messageFromBackend: payload.errorMessage,
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
          userProfileDetails: UserProfileDetails;
          isUserLoggedIn: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        userSignUpInfo: "",
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
          userBuyOfferDetails: BuyOfferDetails[];
          userSellOfferDetails: SellOfferDetails[];
          isUserLoggedIn: boolean;
        }>
      ): AppState => ({
        ...state,
        isRequestPending: false,
        userSignUpInfo: "",
        userProfileDetails: payload.userProfileDetails,
        userBuyOfferDetails: payload.userBuyOfferDetails,
        userSellOfferDetails: payload.userSellOfferDetails,
        isUserLoggedIn: payload.isUserLoggedIn,
      })
    );
});

export default AppReducer;
