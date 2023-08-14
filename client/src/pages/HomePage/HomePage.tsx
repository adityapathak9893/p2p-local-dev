import React from "react";
import "./HomePage.css";
import { NavigationBar } from "../../components/NavigationBar";
import { useNavigate } from "react-router-dom";
import { BuySellOfferForm } from "../../components/BuySellOfferForm";

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (page: string) => navigate(page);
  return (
    <>
      <NavigationBar
        isUserLoggedIn={false}
        handleNavigation={handleNavigation}
      />
      <div className="buySellContainerWrapper">
        <BuySellOfferForm />
      </div>
    </>
  );
};
