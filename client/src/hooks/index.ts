import { useDispatch, useSelector } from "react-redux";
import {
  doUserSignUp,
  doUserSignIn,
  getSignedInUser,
  doUserSignOut,
  resetBackendMessage,
} from "../actions";
import { AppDispatch, RootState } from "../reducers/store";

export const useStateSelector = () => ({
  userSignUpInfo: useSelector((state: RootState) => state.userSignUpInfo),
  isRequestPending: useSelector((state: RootState) => state.isRequestPending),
  isUserLoggedIn: useSelector((state: RootState) => state.isUserLoggedIn),
  userProfileDetails: useSelector(
    (state: RootState) => state.userProfileDetails
  ),
  userBuyOfferDetails: useSelector(
    (state: RootState) => state.userBuyOfferDetails
  ),
  allBuyOfferDetails: useSelector(
    (state: RootState) => state.allBuyOfferDetails
  ),
  userSellOfferDetails: useSelector(
    (state: RootState) => state.userSellOfferDetails
  ),
  allSellOfferDetails: useSelector(
    (state: RootState) => state.allSellOfferDetails
  ),
  messageFromBackend: useSelector(
    (state: RootState) => state.messageFromBackend
  ),
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
  };
};
