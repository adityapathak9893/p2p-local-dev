import React, { useEffect, useState } from "react";
import { useActionDispatch, useStateSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import "./SignUpForm.css";
import { USER_SIGN_UP_SUCCESSFUL } from "../../models/constants";

export const SignUpForm: React.FC = () => {
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [signUpMessage, setSignUpMessage] = useState("");

  const { doUserSignUp } = useActionDispatch();
  const { userSignUpInfo } = useStateSelector();
  const resetForm = () => {
    setPhone("");
    setEmail("");
    setPassword("");
    setCountryCode("");
    setErrors({});
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
    validateForm({ ...errors, phone: validatePhone(newPhone) });
  };

  const handleCountryCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCountryCode = e.target.value;
    setCountryCode(newCountryCode);
    validateForm({
      ...errors,
      countryCode: validateCountryCode(newCountryCode),
    });
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm({ ...errors, email: validateEmail(newEmail) });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm({ ...errors, password: validatePassword(newPassword) });
  };

  const validateForm = (formErrors: { [key: string]: string }) => {
    setErrors(formErrors);
    setIsFormValid(Object.values(formErrors).every((error) => error === ""));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) {
      // Perform signup logic here
      doUserSignUp(phone, email, password).then(() => {
        resetForm();
      });
    }
  };

  const validateCountryCode = (countryCode: string) => {
    // Implement validation logic for country code here
    return countryCode ? "" : "Country code is required";
  };

  const validatePhone = (phone: string) => {
    if (!phone) {
      return "Phone is required";
    }
    if (phone.length !== 10) {
      return "Phone number should be 10 digits";
    }
    return "";
  };

  const validateEmail = (email: string) => {
    // Implement email validation logic here
    return email ? "" : "Email is required";
  };

  const validatePassword = (password: string) => {
    // Implement password validation logic here
    return password ? "" : "Password is required";
  };

  useEffect(() => {
    setErrors({
      phone: "",
      email: "",
      password: "",
      countryCode: "",
    });
  }, []);

  useEffect(() => {
    const validity =
      phone &&
      email &&
      password &&
      countryCode &&
      Object.values(errors).every((error) => error === "");
    setIsFormValid(validity === "" ? false : validity);
  }, [phone, email, password, countryCode, errors]);

  useEffect(() => {
    if (userSignUpInfo === USER_SIGN_UP_SUCCESSFUL) {
      const timeOutRef = setTimeout(function () {
        setSignUpMessage(
          "Signed-up successfully, now please go to sign-in page to sign-in"
        );
      }, 3000);
    }
  }, [userSignUpInfo]);

  return (
    <div className="signup-container">
      {signUpMessage !== "" && <h5>{signUpMessage}</h5>}
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Country Code:</label>
          <select
            value={countryCode}
            onChange={handleCountryCodeChange}
            className={errors.countryCode ? "error" : "countryCode"}
          >
            <option value="">Select Country Code</option>
            <option value="+1">+1 (United States)</option>
            {/* Add more country code options */}
          </select>
          {errors.countryCode && (
            <span className="error-message">{errors.countryCode}</span>
          )}
        </div>
        <div className="form-group">
          <label>Phone:</label>
          <input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            className={errors.phone ? "error" : ""}
          />
          {errors.phone && (
            <span className="error-message">{errors.phone}</span>
          )}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            className={errors.email ? "error" : ""}
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            className={errors.password ? "error" : ""}
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <button className="signUpSubmit" type="submit" disabled={!isFormValid}>
          Sign Up
        </button>
      </form>
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
};
