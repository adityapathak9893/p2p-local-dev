import React, { useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { SignUpPage } from "../../pages/SignUpPage";
import { SignInPage } from "../../pages/SignInPage";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { NavigationBar } from "../NavigationBar";
import { NotificationPopper } from "../NotificationPopper";
import { CreateOffersPage } from "../../pages/CreateOffersPage";
import { UserDashBoardPage } from "../../pages/UserDashBoardPage";

export const App: React.FC = () => {
  const {
    isUserLoggedIn,
    messageFromBackend,
    isRequestPending,
    doesErrorOccur,
    userProfileDetails,
  } = useStateSelector();
  const { getSignedInUser } = useActionDispatch();
  const logoutChannel = new BroadcastChannel("user-logout");

  logoutChannel.onmessage = (event) => {
    if (event.data === "logout") {
      // Perform logout actions (e.g., clear tokens, redirect)
      getSignedInUser();
    }
  };

  useEffect(() => {
    getSignedInUser();
  }, [isUserLoggedIn]);

  return (
    <div id="AppContainer">
      {isRequestPending ? (
        <div id="LoadingIndicatorContainer">
          <LoadingIndicator />
        </div>
      ) : (
        <Router>
          <div id="NavigationBarWrapper">
            <NavigationBar
              isUserLoggedIn={isUserLoggedIn}
              otherPages={
                isUserLoggedIn
                  ? [
                      { label: "Buy", link: "/buyOffers" },
                      { label: "Sell", link: "/sellOffers" },
                      { label: "Create an offer", link: "/createOffers" },
                      { label: "DashBoard", link: "/user-dashboard" },
                    ]
                  : [
                      { label: "Buy", link: "/buyOffers" },
                      { label: "Sell", link: "/sellOffers" },
                    ]
              }
              signInSignUpPages={[
                { label: "Sign-in", link: "/signin" },
                { label: "Sign-up", link: "/signup" },
              ]}
              loggedInUserName={userProfileDetails.userName}
            />
          </div>
          {!!messageFromBackend && (
            <NotificationPopper
              message={messageFromBackend}
              doesErrorOccur={doesErrorOccur}
            />
          )}
          <Routes>
            <Route
              path="/"
              element={
                isUserLoggedIn ? (
                  <Navigate replace to={"/user-dashboard"} />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isUserLoggedIn ? (
                  <Navigate replace to={"/user-dashboard"} />
                ) : (
                  <SignUpPage />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isUserLoggedIn ? (
                  <Navigate replace to={"/user-dashboard"} />
                ) : (
                  <SignInPage />
                )
              }
            />
            <Route
              path="/user-dashboard"
              element={
                !isUserLoggedIn ? (
                  <Navigate replace to={"/"} />
                ) : (
                  <UserDashBoardPage />
                )
              }
            />
            <Route
              path="/createOffers"
              element={
                !isUserLoggedIn ? (
                  <Navigate replace to={"/signin"} />
                ) : (
                  <CreateOffersPage />
                )
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};
