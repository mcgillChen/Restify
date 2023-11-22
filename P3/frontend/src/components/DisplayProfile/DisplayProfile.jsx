import React, { useState, useEffect } from "react";
import "./styles.css";

const AccountInfo = () => {
  const [account, setAccount] = useState([]); //set default to empty array
  useEffect(() => {
    const fetchAccount = () => {
      const access_token = "Bearer " + localStorage.getItem("accessToken");

      const url = `http://127.0.0.1:8000/accounts/view-user-profile/`;

      fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: access_token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]);
          setAccount(data[0]);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchAccount();
  }, []);

  localStorage.setItem("user_id", account.id);
  localStorage.setItem("username", account.username);
  localStorage.setItem("first_name", account.first_name);
  localStorage.setItem("last_name", account.last_name);
  localStorage.setItem("email", account.email);
  localStorage.setItem("phone_number", account.profile?.phone_number);

  return (
    <div id="profile-info-container" key={account.id}>
      <div>
        <img src="" alt="PROFILE PIC" />
      </div>
      <div id="profile-info">
        <b>UserID:</b> {account.id}
      </div>
      <div id="profile-info">
        <b>Username:</b> {account.username}{" "}
      </div>
      <div id="profile-info">
        <b>Firstname:</b> {account.first_name}
      </div>
      <div id="profile-info">
        <b>Lastname:</b> {account.last_name}{" "}
      </div>
      <div id="profile-info">
        <b>Email:</b> {account.email}
      </div>
      <div id="profile-info">
        <b>Phonenumber:</b> {account.profile?.phone_number}
      </div>
    </div>
  );
};

export default AccountInfo;
