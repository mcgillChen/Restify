import React, { useEffect, useState } from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import CreatePropForm from "../../components/Forms/CreatePropForm/CreatePropForm";
import EditPropForm from "../../components/Forms/EditPropForm/EditPropForm";
import './styles.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Post from "../api/Post";


function EditProp() {

  // let { pid } = useParams();
  let { pid } = useParams()
  let [title, setTitle] = useState();

  // var [pid, setPid] = useState();

  useEffect(()=> {
    // setPid(param)
    const data = async () => {


      const propVal = await Post({"pid":pid},"prop/search/")
      const propdata = await Object.values(propVal)
      console.log(propdata[1][0].title)
      setTitle(propdata[1][0].title)
      // setPropInfo(propdata[1][0]);

      // extractData(propdata[1][0],data);

  }
    data();
    console.log(pid)
  })

    return (<PageContainter >
        <Nav/> 
        <main className="prop-setup-main">

            <div className="prop-setup-form-container">
              <div className="page-heading" styles={{display:"inline"}}>
                <p styles={{display:"inherit"}}>Edit your property for:{<Link to={"/propdetail/"+pid+"/"} style={{display:"inline"}}>{title}</Link>}</p>

              </div>

              <EditPropForm pid={pid}/>
            </div>

        </main>

    
        </PageContainter>
    )
};

export default EditProp;