import React from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import "./styles.css";
import { Link } from "react-router-dom";
import EditProfileForm from "../../components/Forms/EditProfileForm/EditProfileForm";
function EditProfilePage() {
  const user_id = localStorage.getItem("user_id");
  const first_name = localStorage.getItem("first_name");

  return (
    <div>
      <Nav />

      <PageContainter>
        <div className="container">
          <main>
            <div id="profile-title">Edit Profile</div>
            <Link to="/myprofile">Go back to my Profile</Link>
            <div>
              <b>id: {user_id}</b>
            </div>
            <div>
              <b>Name: {first_name}</b>
            </div>
            <EditProfileForm></EditProfileForm>
            <div>* Only enter the fields you want to change</div>
          </main>
        </div>
        <footer>
          <p></p>
        </footer>
      </PageContainter>
    </div>
  );
}

export default EditProfilePage;
