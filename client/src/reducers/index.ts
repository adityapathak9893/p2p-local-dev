import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import {
  doUserSignIn,
  doUserSignOut,
  doUserSignUp,
  getSignedInUser,
} from "../actions";
import { initializedAppState } from "../models/initializations";
import {
  AppState,
  BuyOfferDetails,
  SellOfferDetails,
  UserProfileDetails,
} from "../models/interfaces";
import { USER_SIGN_UP_UNSUCCESSFUL } from "../models/constants";

const AppReducer = createReducer(initializedAppState, (app) => {
  app
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
        userSignUpInfo: USER_SIGN_UP_UNSUCCESSFUL,
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
        userSignUpInfo: payload.message,
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
        errorMessage: payload.errorMessage,
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
