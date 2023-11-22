import React from "react";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import "./styles.css";
import { Link } from "react-router-dom";

import { useAPIContext } from "../../contexts/APIContexts";
import PageContainer from "../../components/PageTemplate/PageContainter";

function Login() {
  // localStorage.clear();
  return (
    <div className="page-container">
      <Nav></Nav>

      <div className="login-middle-section-container">
        <section>
          <div className="login-form-container">
            <div className="title">
              <div>Log in to Restify</div>
            </div>

            <LoginForm />

            <div className="signup-forgot-row">
              <div className="signup-box">
              <Link to="/signup">Sign Up</Link>

              </div>
              
            </div>
          </div>
        </section>
      </div>
      <footer>
        <p>Team 2066 Restify</p>
      </footer>
    </div>
  );
}

export default Login;
