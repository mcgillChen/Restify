import "./styles.css";
import { Link } from "react-router-dom";
import phimage from "../../images/temp_h.webp";
import { useState } from "react";

export default function DisplayUserProperty(data) {
  const dataArray = Object.values(data);

  // const [delWarning, setDelWarning] = useState();

  function deleteProp(title) {
    // console.log(deleteCheck)
    // if (deleteCheck != true){
    //     alert("click delete will delete property: "+ title+"\nClick again to delete")
    //     setDeleteCheck(true)
    // }
    // else{
    //     console.log(dataArray)
    //     setDeleteCheck(false)
    // }
  }

  function clip(string) {
    let clippedStr;
    if (string.length > 20) {
      clippedStr = string.slice(0, 20);
      return clippedStr + "...";
    } else {
      return string;
    }
  }

  return (
    dataArray &&
    dataArray.map(({ id, title, location, price }) => {
      return (
        <div className="unit-card-container" key={id} id={id}>
          <div className="unit-card-title">{title}</div>
          <Link to={"/editprop/" + id}>
            <button>Edit Property</button>
          </Link>
          <hr />
          <Link to={"/propImage/" + id}>
            <button>Add Image</button>
          </Link>
          <hr />
          <Link to={"/activateprop/" + id}>
            <button>Activate Property</button>
          </Link>
          <hr />
          <Link to={"/deleteprop/" + id}>
            <button>Delete</button>
          </Link>
        </div>
      );
    })
  );
}
