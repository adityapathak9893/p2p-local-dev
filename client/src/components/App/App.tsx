import React, { useEffect } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { HomePage } from "../../pages/HomePage";
import { SignUpPage } from "../../pages/SignUpPage";
import { SignInPage } from "../../pages/SignInPage";
import { UserDashBoard } from "../UserDashBoard";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { LoadingIndicator } from "../LoadingIndicator/LoadingIndicator";
import { NavigationBar } from "../NavigationBar";
import { NotificationPopper } from "../NotificationPopper";

export const App: React.FC = () => {
  const { isUserLoggedIn, messageFromBackend, isRequestPending } =
    useStateSelector();
  const { getSignedInUser } = useActionDispatch();

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
              pages={["Create an offer", "signin", "signup"]}
            />
          </div>
          {!!messageFromBackend && (
            <NotificationPopper message={messageFromBackend} />
          )}
          <Routes>
            <Route
              path="/"
              element={
                isUserLoggedIn ? (
                  <Navigate replace to={"/userdashboard"} />
                ) : (
                  <HomePage />
                )
              }
            />
            <Route
              path="/signup"
              element={
                isUserLoggedIn ? (
                  <Navigate replace to={"/userdashboard"} />
                ) : (
                  <SignUpPage />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isUserLoggedIn ? (
                  <Navigate replace to={"/userdashboard"} />
                ) : (
                  <SignInPage />
                )
              }
            />
            <Route
              path="/userdashboard"
              element={
                !isUserLoggedIn ? (
                  <Navigate replace to={"/"} />
                ) : (
                  <UserDashBoard />
                )
              }
            />
          </Routes>
        </Router>
      )}
    </div>
  );
};
