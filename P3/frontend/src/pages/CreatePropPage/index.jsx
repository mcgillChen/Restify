import React from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import CreatePropForm from "../../components/Forms/CreatePropForm/CreatePropForm";
import './styles.css';
// import { useParams } from "react-router-dom";

function CreateProp() {

  // let { id } = useParams();

    return (<PageContainter >
        <Nav/> 
        <main className="prop-setup-main">

            <div className="prop-setup-form-container">
              <div className="page-heading">
                <p>Setup your property:</p>
              </div>

              <CreatePropForm/>
            </div>

        </main>

    
        </PageContainter>
    )
};

export default CreateProp;