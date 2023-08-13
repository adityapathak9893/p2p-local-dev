import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import "./UserDashBoard.css";
import { useActionDispatch, useStateSelector } from "../../hooks";

export const UserDashBoard: React.FC = () => {
  const { isUserLoggedIn, userProfileDetails, isRequestPending } =
    useStateSelector();
  const { doUserSignOut } = useActionDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch action to logout user
    doUserSignOut().then(() => {
      navigate("/");
    });
  };
  return (
    <div>
      <header>
        <h1>{`Welcome ${userProfileDetails.userName} to Your Bitcoin Exchange Dashboard`}</h1>
        <p>Manage your offers, trades, and account settings.</p>
      </header>
      <section className="dashboard-content">
        <div className="dashboard-section">
          <h2>My Offers</h2>
          <ul>
            <li>
              <Link to="/userdashboard">View My Buy Offers</Link>
            </li>
            <li>
              <Link to="/userdashboard">View My Sell Offers</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
        <div className="dashboard-section">
          <h2>My Trades</h2>
          <ul>
            <li>
              <Link to="/userdashboard">View Trade History</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
        <div className="dashboard-section">
          <h2>Account Settings</h2>
          <ul>
            <li>
              <Link to="/userdashboard">Profile</Link>
            </li>
            <li>
              <Link to="/userdashboard">Security</Link>
            </li>
            <li>
              <Link to="/userdashboard">General Settings</Link>
            </li>
            {/* Add more links as needed */}
          </ul>
        </div>
      </section>
      <button onClick={handleLogout}>Logout</button>
      <footer>
        <p>© 2023 p2p_local Exchange. All rights reserved.</p>
      </footer>
    </div>
  );
};
