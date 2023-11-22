import React, { useState } from "react";

import "./styles.css";
import { useNavigate } from "react-router-dom";
import logo from "../../images/logo-black.png";
import pp from "../../images/user-placeholder.png";
import notifications from "../../images/notifications.svg";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";

import { APIContext, useAPIContext } from "../../contexts/APIContexts";
import { useEffect } from "react";
import { useContext } from "react";
import LogoutButton from "../Logout/Logout";
function Nav() {
  const { userInfo, accessToken, refreshToken } = useContext(APIContext);

  let [loggedin, setLoggedin] = useState(false);

  const defaultOptions = (
    <div className="menu-options">
      <div className="menu-option">
        <Link id="nav0" to="/login">
          Login
        </Link>
      </div>
      <div className="menu-option">
        <Link id="nav1" to="/signup">
          Sign Up
        </Link>
      </div>
      <div className="menu-option">
        <a id="nav2" href="index.html">
          Home Page
        </a>
      </div>
    </div>
  );

  const loggedinOptions = (
    <div className="menu-options">
      <div className="menu-option">
        <a id="nav4" href="notification_prof.html">
          Notification
        </a>
      </div>
      <div className="menu-option">
        <Link id="nav1" to="/myresguest">
          My Reservations(Guest)
        </Link>
      </div>
      <div className="menu-option">
        <Link id="nav1" to="/myreshost">
          My Reservations(Host)
        </Link>
      </div>
      <div className="menu-option">
      <Link id="nav2" to="/myprofile">
          My Profile
        </Link>
      </div>
      <div className="menu-option">
        <Link id="nav3" to="/myprop">
          My Properties
        </Link>
      </div>
      <div className="menu-option">
        {/* <Link id="nav3" to="/login">
          Logout
        </Link> */}
        <LogoutButton></LogoutButton>
      </div>
    </div>
  );

  useEffect(() => {
    // if logged in

    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken) {
      setLoggedin(false);
    } else {
      setLoggedin(true);
    }
  });

  return (
    <header>
      {/* <APIContext.Provider value={{users}} */}
      <div className="nav">
        <div className="menu">
          <img className="pp" src={pp} alt="ph" />

          {loggedin ? loggedinOptions : defaultOptions}
        </div>

        {/* <div className="notification-icon">
          <img className="pp" src={notifications} alt="ph" />
          <div className="menu-options">
            <div className="menu-option">
              <a id="nav4" href="notification_prof.html">
                &#8226; D. Trump has requested to book your property
              </a>
            </div>
            <div className="menu-option">
              <a id="nav4" href="notification_prof.html">
                &#8226; Joe Biden approved your reservation!
              </a>
            </div>
            <div className="menu-option">
              <a id="nav4" href="notification_prof.html">
                &#8226; B. Obamam has requested to book you property
              </a>
            </div>
            <div className="menu-option">
              <a id="nav4" href="notification_prof.html">
                &#8226; Bush approved your reservation!
              </a>
            </div>
          </div>
        </div> */}

        <div className="logo">
          <Link to="/">
            <img
              src={logo}
              alt="Company logo, black and white text that says Restify"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Nav;
