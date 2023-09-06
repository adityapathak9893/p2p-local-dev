import React from "react";
import { SignInForm } from "../../components/SignInForm";
import "./SignInPage.scss";

export const SignInPage: React.FC = () => {
  return (
    <div className="signInPageContainer">
      <div className="signInFormContainer">
        <SignInForm />
      </div>
      <div className="signInImageContainer">
        <div className="imageWrapper"></div>
      </div>
    </div>
  );
};
