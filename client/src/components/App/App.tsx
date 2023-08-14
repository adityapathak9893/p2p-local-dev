import React, { useEffect } from "react";
import "./App.css";
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

export const App: React.FC = () => {
  const { isUserLoggedIn, userProfileDetails, isRequestPending } =
    useStateSelector();
  const { getSignedInUser } = useActionDispatch();

  useEffect(() => {
    getSignedInUser();
  }, [isUserLoggedIn]);
  return (
    <div>
      {isRequestPending ? (
        <div className="loadingIndicatorContainer">
          <LoadingIndicator />
        </div>
      ) : (
        <Router>
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
