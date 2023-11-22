
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


    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [type, setType] = useState();
    const [amenity_id, setAmenity_id] = useState("1");
    const [location, setLocation] = useState();
    const [structure, setStructure] = useState("0,0,0");
        const [totBed, setTotBed] = useState();
        const [totRoom, setTotRoom] = useState();
        const [totWashroom, setTotWashroom] = useState();


    const [rent_type, setRent_type] = useState();
    const [avaliable_structure, setAvaliable_structure] = useState("0,0,0");
        const [avaBed, setAvaBed] = useState();
        const [avaRoom, setAvaRoom] = useState();
        const [avaWashroom, setAvaWashroom] = useState();
    const [price , setPrice ] = useState();
    const [total_guests , setTotal_guests ] = useState();
    const [avaliable_guests , setAvaliable_guests ] = useState();

    const [error, setError] = useState("");
    const [amenity, setAmenity] = useState();
    const [selectedAmenity, setSelectedAmenity] = useState([]);

    const [pid,setPid] = useState();
    const [propInfo, setPropInfo] = useState();
    const [defaultAmenity, setDefaultAmenity] = useState();

    const [notification, setNotification] = useState("")
    const navigate = useNavigate();

    // const { userInfo, setUserInfo } = useContext(APIContext);
    // const { accessToken,  setAccessToken} = useContext(APIContext);
    // const { refreshToken,  setRefreshToken} = useContext(APIContext);

    function convertAmenity_id(){
        console.log(selectedAmenity);
        console.log(selectedAmenity.length == 0)
        if (selectedAmenity.length == 0){
            console.log('lmao')
            setAmenity_id('1');
            return;
        }

        let a_id = ""
   
        for (let obj of selectedAmenity){
            a_id += obj.id + ","
        }
        console.log(a_id)
        setAmenity_id(a_id.substring(0,a_id.length-1))
        
    }

    async function submit(e){
        e.preventDefault();
        console.log(e);
        convertAmenity_id();
        console.log(amenity_id)

        console.log(selectedAmenity);
        console.log(selectedAmenity.length == 0)
        if (selectedAmenity.length == 0){
            console.log('lmao')
            setNotification("your property must contain at least 1 amenity")
            setAmenity_id('1');
            return;
        }

        let a_id = ""
   
        for (let obj of selectedAmenity){
            a_id += obj.id + ","
        }
        console.log(a_id)
        // setAmenity_id(a_id.substring(0,a_id.length-1))
        const aa_id = a_id.substring(0,a_id.length-1)
        const query = {
            // "prop_id":pid,
            "title":title,
            "description":description,
            "type":type,
            "amenity_id":aa_id,
            "location":location,
            "structure":totBed+","+totRoom+","+totWashroom,
            "rent_type":rent_type,
            "avaliable_structure":avaBed+","+avaRoom+","+avaWashroom,
            "price":price.toString(),
            "total_guests":total_guests.toString(),
            "avaliable_guests":avaliable_guests.toString(),
        }
        // {"username": username, "password": password}
        console.log(query);
        const result = await AuthPut(query,"prop/"+pid+"/edit/");
        
        // if (result)
        console.log(result[1])
        console.log(result[0])
        
        if (result[0] < 200 || result[0] >= 300) {
            
            console.log(Object.keys(result[1]).length)
            // var msg = ""
            // for (let obj of result[1]){
            //     console.log(result[1][obj])
            // }
            setError(result[1])
        }
        else{
            console.log('success');
            setNotification('success')
            navigate("/myprop");
        }

    }

    function extractData(propobj,allamenities){
      console.log(propobj)
      setType(propobj.type);
      setTitle(propobj.title)
      setDescription(propobj.description)
      setRent_type(propobj.rent_type)

      let tot_struct = propobj.structure.split(",")
      setTotBed(tot_struct[0])
      setTotRoom(tot_struct[1])
      setTotWashroom(tot_struct[2])

      let ava_struct = propobj.avaliable_structure.split(",")
      setAvaBed(ava_struct[0])
      setAvaRoom(ava_struct[1])
      setAvaWashroom(ava_struct[2])

      setLocation(propobj.location)
      setPrice(propobj.price)
      setTotal_guests(propobj.total_guests)
      setAvaliable_guests(propobj.avaliable_guests)

      const defaultAmenityId = propobj.amenity_id.split(',')
      var amenity_obj_dict = []

      for (let amenityInstance of allamenities){

        for (let id of defaultAmenityId){

          if (amenityInstance.id == id){
            amenity_obj_dict.push(amenityInstance)
          }
        }
      setDefaultAmenity(amenity_obj_dict)
      setSelectedAmenity(amenity_obj_dict)
      console.log(defaultAmenity)
        
        // amenity_obj_dict.put()
      }



    }


    useEffect(() => {
        const data = async () => {
            const amenities = await Get("prop/amenity/");
            const data = await Object.values(amenities);
            // console.log(amenities);
            // console.log(data)

            setAmenity(data);

            const propVal = await Post({"pid":param.pid},"prop/search/")
            const propdata = await Object.values(propVal)
            setPropInfo(propdata[1][0]);

            extractData(propdata[1][0],data);

        }


        // console.log("edit page pid =" + param.pid)
        // console.log(param.pid)
        setPid(param.pid)
        data()
        console.log(amenity)

    },[])

    return    (            
      <form className="setup-property-form" onSubmit={submit}>
      
      <label
        >Which one of the following best describe your place?</label>
      <div className="prop-type-container">

        <input
          id="house"
          type="radio"
          name="prop-type"
          value="House"
          onChange={(e) => {setType(e.target.value); console.log(e.target.value);console.log(amenity)}}
          checked={type==="House"}
          required
          
        /><label className="default" htmlFor="house">House</label>
        <input
          id="apartment"
          type="radio"
          name="prop-type"
          value="Apartment"
          onChange={(e) => {setType(e.target.value); console.log(e.target.value)}}
          checked={type==="Apartment"}
          

        /><label htmlFor="apartment">Apartment</label>
        <input
          id="cabin"
          type="radio"
          name="prop-type"
          value="Cabin"
          onChange={(e) => {setType(e.target.value); console.log(e.target.value)}}
          checked={type==="Cabin"}
          
        /><label htmlFor="cabin">Cabin</label>
        <input
          id="cave"
          type="radio"
          name="prop-type"
          value="Cave"
          onChange={(e) => {setType(e.target.value); console.log(e.target.value)}}
          checked={type==="Cave"}

        /><label htmlFor="cave">Cave</label>
        <input
          id="hotel"
          type="radio"
          name="prop-type"
          value="Hotel"
          onChange={(e) => {setType(e.target.value); console.log(e.target.value)}}
          checked={type==="Hotel"}

        /><label htmlFor="hotel">Hotel</label>
      </div>
      <br/>


      <label htmlFor="rent-type" aria-required="true"
        >Which part of the place are you renting?</label>
      <div className="rent-type-container">
        <input
          id="entire-place"
          type="radio"
          name="rent-type"
          value="Entire Place"
          onChange={(e) => {setRent_type(e.target.value); console.log(e.target.value)}}
          checked={rent_type==="Entire Place"}
          required
        /><label htmlFor="entire-place">Entire Place</label>
        <input
          id="private-room"
          type="radio"
          name="rent-type"
          value="Private Room"
          onChange={(e) => {setRent_type(e.target.value); console.log(e.target.value)}}
          checked={rent_type==="Private Room"}

        /><label htmlFor="private-room">Private Room</label>
        <input
          id="shared-room"
          type="radio"
          name="rent-type"
          value="Shared Room"
          onChange={(e) => {setRent_type(e.target.value); console.log(e.target.value)}}
          checked={rent_type==="Shared Room"}


        /><label htmlFor="shared-room">Shared Room</label>
        <input
          id="entire-floor"
          type="radio"
          name="rent-type"
          value="Entire Floor"
          onChange={(e) => {setRent_type(e.target.value); console.log(e.target.value)
      console.log(amenity)}}
      checked={rent_type==="Entire Floor"}


        /><label htmlFor="entire-floor">Entire Floor</label>
      </div>
      <br/>

      <label>Update Property Amenitites</label>
      <br/>
      <Multiselect
        displayValue="amenity_name"
        onKeyPressFn={function noRefCheck(){}}
        onRemove={(e) => {
              console.log(e)
              setSelectedAmenity(e);
              convertAmenity_id();
        }}
        onSearch={function noRefCheck(){}}
        onSelect={(e) => {
              console.log(e)
              setSelectedAmenity(e);
              convertAmenity_id();
              
              // setAmenity_id(amenity_id+","+e.target.id);
          }}
        options={amenity}
        selectedValues={selectedAmenity}

        avoidHighlightFirstOption
      ></Multiselect>
      <br/>
  
      <label htmlFor="prop-location-address">Location:</label>
      <div className="prop-location">
        <input
          id="prop-location-address"
          type="text"
          placeholder="Enter your address here"
          onChange={(e) => {setLocation(e.target.value); console.log(e.target.value)}}
          defaultValue={location}
          required
        />
      </div>
      <br/>


      <label>Total Property Structures:</label>
      <div className="prop-struct-container">
        <div className="prop-struct-label">
          <label htmlFor="prop-tot-bedroom">Bedrooms </label>
          <label htmlFor="prop-tot-rooms">Rooms </label>
          <label htmlFor="prop-tot-bathrooms">Bathrooms </label>
        </div>
        <div className="prop-struct-item">
          <input
            id="prop-tot-bedroom"
            type="text"
            placeholder="0"
            onChange={(e) => {setTotBed(e.target.value); console.log(e.target.value)}}
            defaultValue={totBed}
            required
          />
          <br />
          <input
            id="prop-tot-rooms"
            type="text"
            placeholder="0"
            onChange={(e) => {setTotRoom(e.target.value); console.log(e.target.value)}}
            defaultValue={totRoom}

            required
          />
          <br />
          <input
            id="prop-tot-bathroom"
            type="text"
            placeholder="0"
            onChange={(e) => {setTotWashroom(e.target.value); console.log(e.target.value)}}
            defaultValue={totWashroom}

            required
          />
          <br />
        </div>
      </div>
      <br/>


      <label>Available Property Structures:</label>
      <div className="prop-struct-container">
        <div className="prop-struct-label">
          <label htmlFor="prop-ava-bedroom">Bedrooms </label>
          <label htmlFor="prop-ava-rooms">Rooms </label>
          <label htmlFor="prop-ava-bathrooms">Bathrooms </label>
        </div>
        <div className="prop-struct-item">
          <input
            id="prop-ava-bedroom"
            type="text"
            placeholder="0"
            onChange={(e) => {setAvaBed(e.target.value); console.log(e.target.value)}}
            defaultValue={avaBed}

            required
          />
          <br />
          <input
            id="prop-ava-rooms"
            type="text"
            placeholder="0"
            onChange={(e) => {setAvaRoom(e.target.value); console.log(e.target.value)}}
            defaultValue={avaRoom}

            required
          />
          <br />
          <input
            id="prop-ava-bathroom"
            type="text"
            placeholder="0"
            onChange={(e) => {setAvaWashroom(e.target.value); console.log(e.target.value)}}
            defaultValue={avaWashroom}
          
            required
          />
          <br />
        </div>
      </div>


      

      <div className="prop-title-container">
        <label htmlFor="prop-title"
          >The title for your property:</label><br />
        <div className="prop-title-item">
          <input
            id="prop-title"
            type="text"
            placeholder="Give your property page a nice title"
            onChange={(e) => {setTitle(e.target.value); console.log(e.target.value)}}
            defaultValue={title}
            required
          />
          <br />
        </div>
      </div>

      <div className="prop-desc-container">
        <label htmlFor="prop-desc"
          >Create a description for your property</label><br />
        <div className="prop-title-item">
          <textarea
            id="prop-desc"
            rows="4"
            type="text"
            placeholder="Tell people more about your place"
            onChange={(e) => {setDescription(e.target.value); console.log(e.target.value)}}
            defaultValue={description}
            required
          ></textarea>
          <br />
        </div>
      </div>

      <label htmlFor="prop-price"
        >How much would you want to charge per night?</label>
      <div className="prop-price-container">
        <input 
          id="prop-price" 
          type="text" 
          placeholder="0" 
          onChange={(e) => {setPrice(e.target.value); console.log(e.target.value)}}
          defaultValue={price}

          required />
      </div>
      <br />

      <label htmlFor="prop-price"
        >How many people can fit in your property in total?</label>
      <div className="prop-price-container">
        <input 
          id="prop-price" 
          type="text" 
          placeholder="0" 
          onChange={(e) => {setTotal_guests(e.target.value); console.log(e.target.value)}}
          defaultValue={total_guests}

          required />
      </div>
      <br />

      <label htmlFor="prop-price"
        >How many guests can your property add?</label>
      <div className="prop-price-container">
        <input 
          id="prop-price" 
          type="text" 
          placeholder="0" 
          onChange={(e) => {setAvaliable_guests(e.target.value); console.log(e.target.value)}}
          defaultValue={avaliable_guests}

          required />
      </div>
      <br />

      <label className="aLabel" htmlFor="attachments"
        >Add pictures to your property:</label>
      <input
        type="file"
        id="attachments"
        name="attachments"
        multiple
      //   required
      /><br />
      
      {Object.keys(error).map((key,msg) => {
          return (
              <p id={"error-"+key}>{key + ": "+error[key][0]}</p>
          )
      })}

      {notification}

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