
import React, { useEffect, useState } from "react"
import Post from '../../../pages/api/Post';
import { APIContext, useAPIContext } from "../../../contexts/APIContexts";
import { useNavigate } from "react-router-dom";
// return default 
import { useContext } from "react";
import AuthGet from "../../../pages/api/AuthGet";
import AuthPost from "../../../pages/api/AuthPost";
import Multiselect from 'multiselect-react-dropdown';
import Get from "../../../pages/api/Get";
import { Link } from "react-router-dom";
import Put from "../../../pages/api/Put";
import AuthPut from "../../../pages/api/AuthPut";

export default function (param) {

  const [selectedDate ,setSelectedDate] = useState()
  const [price, setPrice] = useState(param.apInfo[3]);
  const [error, setError] = useState();

  const date = param.apInfo[0]
  const pid = param.apInfo[1];
  const apid = param.apInfo[2]
  const baseprice = param.apInfo[3];

    // setPrice(param[3])
    console.log(date + ", " + pid + ", " + apid + ", " + baseprice)
    console.log(param.apInfo)
    console.log(param.apInfo[3])

    async function submit(e){
        e.preventDefault();

        
        const query = {
        }
        // {"username": username, "password": password}
        console.log(query);
        const result = await AuthPut(query,"prop/"+pid+"/edit/");
        
        // if (result)
        console.log(result[1])
        
        if (result[0] >= 200 && result[0] < 300) {
            
            console.log(Object.keys(result[1]).length)
            // var msg = ""
            // for (let obj of result[1]){
            //     console.log(result[1][obj])
            // }
            setError(result[1])
        }
        else{
            console.log('success');
            // navigate("/createprop");
        }

    }

    

    useEffect(() => {
      setPrice(param.apInfo[3])
      setSelectedDate(param.selectedDate);
      console.log(10)
      

    },[])

    return    (            
      <form className="setup-property-form"
      //  onSubmit={submit}
      // onSubmit={console.log(price)}

       >
      
      
      <label htmlFor="prop-price">
        Price:
        </label>
      <div className="prop-price-container">
        <input 
          id="prop-price" 
          type="text" 
          // placeholder=
          onChange={(e) => {setPrice(e.target.value); console.log(e.target.value)
            console.log(price)
            console.log(baseprice)
          }}
          defaultValue={baseprice}
          required />
      </div>
      <br />

      
      {error && Object.keys(error).map((key,msg) => {
          return (
              <p id={"error-"+key}>{key + ": "+error[key][0]}</p>
          )
      })}

      <input className="submit" type="submit" value="Submit" />
    </form>
    )

}
/*  the idea is that we have 2 seperate table for creating property,
    1.  one tble goes normally as the create prop thing, that is normal, 
    2.  another table, would be the image table  that consists property_id
        and the image, so that table would be (automated id, pid, image)
        
    for 2, in the front end, we send 1st request to get the pid for the
    property w just created, then we send another request to table 2 with
    the image uploadded by the user and the pid returned from first request

    in the back end, we just add the images to the folder for that prop
    like: resource/propid/all the images

    the same goes for user icon, we have: resource/user/icon

    the only problem is that i am not so sure of multiple images
        ->  since django does not support multiple image creation
            we going to keep track of images uploaded by the user
            and make n times the same request in which each request
            will upload a image, and n is the total number images
            uploaded by the user

*/