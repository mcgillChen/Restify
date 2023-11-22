import React, { useEffect, useState } from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import CreatePropForm from "../../components/Forms/CreatePropForm/CreatePropForm";
import EditPropForm from "../../components/Forms/EditPropForm/EditPropForm";
import "./styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Get from "../api/Get";
import Calendar from "react-calendar";
import PropDateInfoForm from "../../components/Forms/PropDateInfoForm/PropDateInfoForm";
import AuthPatch from "../api/AuthPatch";
import AuthPost from "../api/AuthPost";
import AuthDelete from "../api/AuthDelete";
import AuthPostImage from "../api/AuthPostImg";

import Uploady from "@rpldy/uploady";
import UploadButton from "@rpldy/upload-button";
import UploadPreview from "@rpldy/upload-preview";
import UploadDropZone from "@rpldy/upload-drop-zone";
import { useRef } from "react";
import Post from "../api/Post";

import { Line } from "rc-progress";
import useItemProgressListener from "@rpldy/uploady";
// import { createMockSender } from "@rpldy/sender";

// import Header from "./Header";

// import { useNavigate } from "react-router-dom";
import axios from "axios";

function PropImage() {
  // let { pid } = useParams();
  let { pid } = useParams();
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

  const [selectedFiles, setSelectedFiles] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFiles(event.target.files);
  };

  const navigate = useNavigate();
  const handleUploadImage = async () => {
    console.log(selectedFiles);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      // formData.append('images[]', selectedFiles[i]);
      // console.log(selectedFiles[i])
      formData.append("pid", pid);
      formData.append("upload", selectedFiles[i]);
      console.log(formData);
      const upd = await AuthPostImage(formData, "prop/image/");
      console.log(upd);
      navigate("/myprop");
    }
    console.log(formData);

    // try {
    //   const response = await axios.post('/api/upload-image', formData);
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
  };

  const [title, setTitle] = useState();
  useEffect(() => {
    // setPid(param)
    const data = async () => {
      const propVal = await Post({ pid: pid }, "prop/search/");
      const propdata = await Object.values(propVal);
      console.log(propdata[1][0].title);
      setTitle(propdata[1][0].title);
      // setPropInfo(propdata[1][0]);

      // extractData(propdata[1][0],data);
    };
    data();
    console.log(pid);
  });

  return (
    <div>
      <Nav />

      <PageContainter>
        <main className="prop-setup-main">
          <div className="prop-setup-form-container">
            <p styles={{ display: "inherit" }}>
              Add Image for:
              {
                <Link
                  to={"/propdetail/" + pid + "/"}
                  style={{ display: "inline" }}
                >
                  {title}
                </Link>
              }
            </p>

            <input type="file" onChange={handleFileInput} multiple />
            <button onClick={handleUploadImage}>Upload Image</button>
          </div>
        </main>
      </PageContainter>
    </div>
  );
}

function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUploadImage = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post("/api/upload-image", formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInput} multiple />
      <button onClick={handleUploadImage}>Upload Image</button>
    </div>
  );
}

// export default ImageUploader;
export default PropImage;
