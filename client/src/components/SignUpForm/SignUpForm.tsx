import React, { useEffect, useState } from "react";
import { useActionDispatch, useStateSelector } from "../../hooks";
import "./SignUpForm.scss";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export const SignUpForm: React.FC = () => {
  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  const { doUserSignUp, doUserSignIn } = useActionDispatch();
  const { doesErrorOccur } = useStateSelector();
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
        if (!doesErrorOccur) {
          doUserSignIn(email, password);
        }
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

  return (
    <div className="signup-container">
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
            <option value="+44">+44 (UK)</option>
            <option value="+49">+49 (GERMANY)</option>
            <option value="+33">+33 (FRANCE)</option>
            <option value="+41">+41 (SWITZERLAND)</option>
            <option value="+358">+358 (FINLAND)</option>
            <option value="+48">+48 (POLAND)</option>
            <option value="+34">+34 (SPAIN)</option>
            <option value="+61">+61 (AUSTRALIA)</option>
            <option value="+1">+1 (CANADA)</option>
            <option value="+852">+852 (HONG KONG)</option>
            <option value="+65">+65 (SINGAPORE)</option>
            <option value="+886">+886 (TAIWAN)</option>
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
        By continuing you agree to Localbittrades Terms of Service{" "}
        <a href="/TermsAndServices">Terms Of Services</a>
      </p>
      <p>
        Already have an account?{" "}
        <Button variant="text" onClick={() => navigate("/signin")}>
          Sign In
        </Button>
      </p>
    </div>
  );
};
