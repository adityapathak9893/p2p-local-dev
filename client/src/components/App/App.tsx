import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { UserRegistrationForm } from "../UserRegistrationForm";

export const App: React.FC = () => {
  return (
    <div>
      Welcome page is in progress
      {/* <BrowserRouter>
        <Routes>
          <Route path="/userRegistration" Component={UserRegistrationForm} />
        </Routes>
      </BrowserRouter> */}
    </div>
  );
};
