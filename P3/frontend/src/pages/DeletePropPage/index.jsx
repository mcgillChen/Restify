import React, { useEffect, useState } from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import CreatePropForm from "../../components/Forms/CreatePropForm/CreatePropForm";
import EditPropForm from "../../components/Forms/EditPropForm/EditPropForm";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthDelete from "../api/AuthDelete";
import Post from "../api/Post";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DeleteProp() {
  // let { pid } = useParams();
  let { pid } = useParams();
  let [error, setError] = useState();
  // var [pid, setPid] = useState();

  async function deleteProperty(e) {
    e.preventDefault();

    console.log(pid);
    const result = await AuthDelete("prop/" + pid + "/edit/");
    console.log(result);
    if (result[0] >= 200 && result[0] < 300) {
      console.log("success");
    } else {
      setError(result[1]);
    }
  }

  useEffect(() => {
    // setPid(param)

    console.log(pid);
  });

  return (
    <div>
      <Nav />

      <PageContainter>
        <main className="prop-setup-main">
          <div className="prop-setup-form-container">
            <div className="page-heading" styles={{ display: "inline" }}>
              <p styles={{ display: "inherit" }}>
                Deleteing your property for:
                {
                  <Link
                    to={"/propdetail/" + pid + "/"}
                    style={{ display: "inline" }}
                  >
                    {"prop-detail-page ph"}
                  </Link>
                }
              </p>
            </div>
            <div>
              If you are sure you want to delete this, press the button below
            </div>
            <button onClick={deleteProperty}>DELETE</button>
          </div>
        </main>
      </PageContainter>
    </div>
  );
}

export default DeleteProp;
