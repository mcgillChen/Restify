import React from "react";
import Nav from "../../components/NavBar/NavBar";
import SignUpForm from "../../components/Forms/SignUpForm/SignUpForm";

import PageContainter from "../../components/PageTemplate/PageContainter";
import "./signup.css";
import { Link } from "react-router-dom";

import { useAPIContext } from "../../contexts/APIContexts";
function SignUpPage() {
  localStorage.clear(); //log out the user
  return (
    <div>
      <Nav></Nav>

      <div className="page-container">
        <div className="container">
          <main>
            <div className="title">
              <div>Create an Account</div>
            </div>
            <SignUpForm></SignUpForm>

            <div className="back-to-login-row">
              <div className="back-to-login-box">
                <p>
                  Already have an account?
                  <Link className="login-link" to="/login">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </main>
        </div>
        <footer>
          <p></p>
        </footer>
      </div>
    </div>
  );
}

export default SignUpPage;
