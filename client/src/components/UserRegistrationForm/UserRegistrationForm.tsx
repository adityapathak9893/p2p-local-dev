import React, { useState } from "react";

export const UserRegistrationForm: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  async function registerUser(event: any) {
    event.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_HOST}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        email,
        password,
        userName: email.split("@")[0],
      }),
    });

    const data = await response.json();
  }

  return (
    <div>
      <h1>Registration</h1>
      <form onSubmit={registerUser}>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="number"
          placeholder="Phone-number"
        />
        <br />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="E-Mail"
        />
        <br />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <br />
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};
