import React from "react";
import { SignInForm } from "../../components/SignInForm";
import './SignInPage.css';

export const SignInPage: React.FC = () => {
  return (
    <div className="signInPageContainer">
      <SignInForm />
    </div>
  );
};
