import React from "react";
import { SignUpForm } from "../../components/SignUpForm";
import "./SignUpPage.scss";

export const SignUpPage: React.FC = () => {
  return (
    <div className="signUpPageContainer">
      <div className="signUpFormContainer">
        <SignUpForm />
      </div>
      <div className="signUpImageContainer">
        <div className="signUpImageWrapper"></div>
      </div>
    </div>
  );
};
