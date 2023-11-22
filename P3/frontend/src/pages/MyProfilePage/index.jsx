import React from "react";
import Nav from "../../components/NavBar/NavBar";
import AccountInfo from "../../components/DisplayProfile/DisplayProfile";
import PageContainter from "../../components/PageTemplate/PageContainter";
import "./styles.css";
import { Link } from "react-router-dom";

import { useAPIContext } from "../../contexts/APIContexts";

function MyProfile() {
  return (
    <div>
      <Nav />
      <PageContainter>
        <div className="container">
          <main>
            <div id="profile-title">Profile</div>
            <Link to="/editprofile">Edit Profile</Link><p>      </p>
            <Link to="/usericon">Update Icon</Link>
            <AccountInfo></AccountInfo>
          </main>
        </div>
      </PageContainter>
    </div>
  );
}

export default MyProfile;
