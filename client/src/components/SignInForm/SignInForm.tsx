import React, { useEffect, useState } from "react";
import "./SignInForm.scss";
import { useActionDispatch, useStateSelector } from "../../hooks";

export const SignInForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  const { doUserSignIn } = useActionDispatch();

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setErrors({});
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
      doUserSignIn(email, password).then(() => {
        resetForm();
      });
    }
  };

  const validateEmail = (email: string) => {
    return email ? "" : "Email is required";
  };

  const validatePassword = (password: string) => {
    return password ? "" : "Password is required";
  };

  useEffect(() => {
    setErrors({
      email: "",
      password: "",
    });
  }, []);

  useEffect(() => {
    const validity =
      email && password && Object.values(errors).every((error) => error === "");
    setIsFormValid(validity === "" ? false : validity);
  }, [email, password, errors]);

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
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
        <button className="signInSubmit" type="submit" disabled={!isFormValid}>
          Sign In
        </button>
      </form>
      <p>
        Already have an account? <a href="/signup">Sign Up</a>
      </p>
    </div>
  );
};
