import React, { useContext, useEffect, useState } from "react";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import "./styles.css";
import { Link } from "react-router-dom";

import { APIContext, useAPIContext } from "../../contexts/APIContexts";
import Get from "../api/Get";
import DisplayUserProperty from "../../components/DisplayUserProperty/DisplayUserProperty";

function MyProperty() {
  const [data, setData] = useState();
  const { userInfo, setUserInfo } = useContext(APIContext);
  const [properties, setProperties] = useState([]);
  const userobj = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    console.log(userobj.id);
    const getdata = async () => {
      let prop = await Get("prop/" + userobj.id + "/user-prop/");

      setProperties(DisplayUserProperty(prop));

      console.log(prop);
    };

    getdata();
  }, []);

  return (
    <div>
      <Nav />

      <PageContainter>
        <div className="container">
          <main>
            <section className="intro">
              <div className="property-name">
                <div className="section-title-40">My properties</div>
              </div>
              <Link to="/createprop" className="set-up-new-prop-link">
                Set up new properties
              </Link>
            </section>
            <section className="present-reservations">
              <div className="scrolling-wrapper">{properties}</div>
            </section>
          </main>
        </div>
      </PageContainter>
    </div>
  );
}

export default MyProperty;
