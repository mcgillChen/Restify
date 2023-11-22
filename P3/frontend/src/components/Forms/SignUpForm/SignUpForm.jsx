import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";

const SignupForm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      username: username,
      first_name: firstname,
      last_name: lastname,
      password: password,
      password2: password2,
      profile: {
        phone_number: phonenumber,
      },
    };
    console.log("data:" + data);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/accounts/create-user/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();

        console.log("User created:", data);
        setErrorMessage("");
        setSuccessMessage(""); // Clear any previous error message.
        setSuccessMessage("Registration Sucess");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else if (response.status === 400) {
        const errorData = (await response.text()).slice(2, -2);
        setErrorMessage("");
        setSuccessMessage("");
        setErrorMessage(errorData);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating user:", error);
      alert("Error: Could not create user");
    }
  };

  return (
    <div>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="email-row">
          <label className="form-label" htmlFor="email">
            Your Email
          </label>
          <input
            type="email"
            required
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="firstname-row">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            required
            name="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="firstname-row">
          <label className="form-label" htmlFor="firstname">
            First Name
          </label>
          <input
            type="text"
            required
            name="firstname"
            placeholder="Firstname"
            onChange={(e) => setFirstname(e.target.value)}
          />
        </div>
        <div className="lastname-row">
          <label className="form-label" htmlFor="lastname">
            Last Name
          </label>
          <input
            type="text"
            required
            name="lastname"
            placeholder="Lastname"
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>

        <div className="phone-row">
          <label className="form-label" htmlFor="phonenum">
            Phone Number
          </label>
          <input
            type="text"
            required
            name="phone-num"
            placeholder="Phone Number"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className="password-row">
          <label className="form-label" htmlFor="password">
            Enter Password
          </label>
          <input
            type="password"
            required
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="confirm-password-row">
          <label className="form-label" htmlFor="confirm-password">
            Confirm Password
          </label>
          <input
            type="password"
            required
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div className="checkbox-row">
          <label className="form-label checkbox" htmlFor="consent">
            <input type="checkbox" name="consent" value="yes" required />
          </label>
          <p>By checking this box, you are agreeing to our terms of service.</p>
        </div>

        <div className="submit-button-row">
          <span className="form-label"></span>
          <div className="button-input">
            <button type="submit" className="btn3">
              Sign Up
            </button>
          </div>
        </div>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default SignupForm;
