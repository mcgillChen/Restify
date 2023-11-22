import React, { useEffect, useState } from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import CreatePropForm from "../../components/Forms/CreatePropForm/CreatePropForm";
import EditPropForm from "../../components/Forms/EditPropForm/EditPropForm";
import './styles.css';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Get from "../api/Get";
import Calendar from 'react-calendar'
import PropDateInfoForm from "../../components/Forms/PropDateInfoForm/PropDateInfoForm";
import AuthPatch from "../api/AuthPatch"
import AuthPost from "../api/AuthPost";
import AuthDelete from "../api/AuthDelete";
import AuthPostImage from "../api/AuthPostImg";

import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { useRef } from "react";

import { Line } from "rc-progress";
import useItemProgressListener from "@rpldy/uploady";
// import { createMockSender } from "@rpldy/sender";

// import Header from "./Header";


import axios from 'axios'
import { useNavigate } from "react-router-dom";

function UserIcon() {
const navigate = useNavigate()
  // let { pid } = useParams();
  let { pid } = useParams()
  // var [pid, setPid] = useState();



const filterBySize = (file) => {
  //filter out images larger than 5MB
  return file.size <= 5242880;
};

// const mockEnhancer = (uploader) => {
//   const mockSender = createMockSender({ delay: 1500 });
//   uploader.update({ send: mockSender.send });
//   return uploader;
// };

const indicatorRef = useRef(null);

  


  // const UploadProgress = () => {
  //   const [progress, setProgess] = useState(0);
  
  //   const progressData = useItemProgressListener();
  
  //   if (progressData && progressData.completed > progress) {
  //     setProgess(() => progressData.completed);
  //   }
    
  //   return (
  //     progressData && (
  //       <Line
  //         style={{ height: "10px", marginTop: "20px" }}
  //         strokeWidth={2}
  //         strokeColor={progress === 100 ? "#00a626" : "#2db7f5"}
  //         percent={progress}
  //       />
  //     )
  //   );
  // };


  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFiles(event.target.files);
  }

  const handleUploadImage = async () => {
    console.log(selectedFiles)
    const formData = new FormData();

      // formData.append('images[]', selectedFiles[i]);
      // console.log(selectedFiles[i])
      formData.append('pid',pid)
      formData.append('upload',selectedFiles[0])

      const upd = await AuthPostImage(formData,'prop/image/')
      console.log(upd);
      navigate("/myprop");


    
    console.log(formData)

  }


    return (<PageContainter >
        <Nav/> 
        <main className="prop-setup-main">

            <div className="prop-setup-form-container">
 
              <input type="file" onChange={handleFileInput}/>
              <button onClick={handleUploadImage}>Upload New Icon</button>

            </div>

        </main>

    
        </PageContainter>
    )
};


// export default ImageUploader;
export default UserIcon;