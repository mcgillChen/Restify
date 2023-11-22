import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountInfo from "../../DisplayProfile/DisplayProfile";
import "./styles.css";

const EditProfileForm = () => {
  //get some basic info from local storage

  const user_id = localStorage.getItem("user_id");
  const navigate = useNavigate();
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

    // const data = {
    //   email: email,
    //   first_name: firstname,
    //   last_name: lastname,
    //   password: password,
    //   password2: password2,
    //   profile: {
    //     phone_number: phonenumber,
    //   },
    // };

    //only submit non-empty fields

    let data = {};

    if (email) {
      data.email = email;
    }
    if (firstname) {
      data.first_name = firstname;
    }
    if (lastname) {
      data.last_name = lastname;
    }
    if (password) {
      data.password = password;
    }
    if (password2) {
      data.password2 = password2;
    }
    if (phonenumber) {
      data.profile = {
        phone_number: phonenumber,
      };
    }

    console.log("data:" + data);
    const access_token = "Bearer " + localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/accounts/edit-user-profile/${user_id}/`,
        {
          method: "PUT",
          headers: {
            Authorization: access_token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      // Check if the request was successful
      if (response.ok) {
        const data = await response.json();

        console.log("User updated:", data);
        setErrorMessage("");
        setSuccessMessage(""); // Clear any previous error message.
        setSuccessMessage("Update Sucess");

        //! Redirect?
        // setTimeout(() => {
        //   navigate("/myprofile");
        // }, 2000);
      } else if (response.status === 400) {
        const errorData = (await response.text()).slice(2, -2);
        console.log("Error Data:" + errorData);
        setErrorMessage("");
        setSuccessMessage("");
        setErrorMessage(errorData);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error: Could not update user");
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
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="firstname-row">
          <label className="form-label" htmlFor="firstname">
            First Name
          </label>
          <input
            type="text"
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
            name="confirmpassword"
            placeholder="Confirm Password"
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>

        <div className="submit-button-row">
          <span className="form-label"></span>
          <div className="button-input">
            <button type="submit" className="btn3">
              Confirm Edit
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

export default EditProfileForm;
