import React, { useEffect, useState } from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import CreatePropForm from "../../components/Forms/CreatePropForm/CreatePropForm";
import EditPropForm from "../../components/Forms/EditPropForm/EditPropForm";
import './styles.css';
import { redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Post from "../api/Post";
import Get from "../api/Get";
// import { Redirect } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function PropDetail() {

  // let { pid } = useParams();
  let { pid } = useParams()
  let [ propInfo, setPropInfo] = useState()

  let [title, setTitle] = useState()
  let [description, setDescription] = useState()
  let [avaliable_guests, setAvaliable_guests] = useState()
  let [rooms, setRooms] = useState()
  let [beds, setBeds] = useState()
  let [washrooms, setWashrooms] = useState()
  let [amenities, setAmenities] = useState()
  let [location, setLocation] = useState()
  let [prop_type, setProp_type] = useState()
  let [host, setHost] = useState()

  let [sa, setSA] = useState()

  let [error, setError] = useState()
  let [dates, setDates] = useState()
  let [cost, setCost] = useState()

  let [guest, setGuest] = useState()


    let nativate=useNavigate();
  let [numDays, setNumDays] = useState()
  let [tax, setTax] = useState()
  let [total, setTotal] = useState()

  let [startDay, setStartDay] = useState(new Date().toLocaleDateString('en-CA'))
  let [endDay, setEndDay] = useState(new Date().toLocaleDateString('en-CA'))

  let [notification,setNotification]=useState()
  let [propAva, setPropAva] = useState()

  const [submitted, setSubmitted] = useState(false);
  // var [pid, setPid] = useState();

  function extractData(prop, allamenities,owner, ava) {
    setTitle(prop.title)
    setDescription(prop.description)
    setAvaliable_guests(prop.avaliable_guests)
    
    const struct = prop.avaliable_structure.split(',')
    setRooms(struct[0])
    setBeds(struct[1])
    setWashrooms(struct[2])

    // console.log(allamenities)

    var am = []
    for (let aid of prop.amenity_id){

        for (let bruh of allamenities){
            // if (String(aid) === String(bruh.id)){
            //     am.push(bruh.amenity_name);
            //     break;
            // }
            if (String(aid) === String(bruh.id)){
                am.push(bruh.amenity_name);
                break;
            }
        }
    }
    // console.log(am)
    setAmenities(am)

    setHost(owner.username)
    setLocation(prop.location)
    setProp_type(prop.type)
    // console.log(owner.username)

  const displayAmenties = am.map((item, index) => {
    return <div className='offer-item' key={index}>&#8226; {item}</div>
    
    // <p key={index}>{item}</p>;
  });

//   console.log(displayAmenties)
  setSA(displayAmenties)
  console.log(ava);
  var dic = {}
  for (let obj of ava){
    dic[obj.date]=[obj.id,obj.date,obj.price,obj.pid]
  }

  console.log(dic)
  setPropAva(dic)
  }


  function formatDate(e){
    let year = e.getFullYear();
    let month = e.getMonth() + 1;
    let date = e.getDate();

    if (month < 10){
      month = "0" + month.toString();
    }
    if (date<10){
      date = "0" + date.toString();
    }
    return year+'-'+month+'-'+date;
  }

  function updateTotal(start,end){
    
    console.log("start: "+start+'\nend: '+end)
    // console.log(start==end)

    if (start == end){
        setNotification('can\'t checkin/out on the sme day');
        return;
    }

    let sd, ed;

    if (start === -1){
        sd = startDay;
        ed = end
    }

    if (end === -1){
        sd = start;
        ed = endDay
    }
    console.log("start: "+sd+'\nend: '+ed)

    var sd1 = new Date(sd)
    var ed1 = new Date(ed)
    console.log("start: "+sd1+'\nend: '+ed1)

    const diff = Math.round((ed1.getTime() - sd1.getTime()) / (1000 * 60 * 60 * 24));
    console.log(diff)

    if (diff<=0){
        setNotification("end day must be later than start day")
        setCost(0)
        setTax(0)
        setTotal(0)
        setNumDays(0)
    }
    else{
        // console.log(1)
        setNotification()
    }

    
    var getDaysArray = function(sd,ed) {
        for(var a=[],d=new Date(sd);d<=new Date(ed);d.setDate(d.getDate()+1))
        { 
            // let day = Date(d)
            // console.log(sd)
            // console.log(ed)
            // console.log(d)
            // console.log(new Date(sd).setDate())
            // d.setDate(d.getDate()+1)
            a.push(formatDate(new Date(d)))
        }
        return a;};

    var sd2 = new Date(sd)
    sd2.setDate(sd2.getDate()+1)
    // console.log(sd2)

    var ed2 = new Date(ed)
    ed2.setDate(ed2.getDate())
    // console.log(ed2)

    console.log(getDaysArray(sd2,ed2))
    var daysArray = getDaysArray(sd2,ed2)
    // console.log()


    var priceCount=0;
    for (let day of daysArray){

        console.log(propAva)
        console.log(day)
        console.log(propAva[day])
        if (propAva[day] == null){
            setNotification('selected time is not avaliable')
            return;
        }
    setNotification('')

        priceCount += parseFloat(propAva[day][2])

    }
    console.log(priceCount)
    setCost(priceCount)
    setNumDays(diff)
    setTax((priceCount*0.13).toFixed(2))
    setTotal((priceCount+(priceCount*0.13)).toFixed(2))



  }


  function submit(e){
    e.preventDefault();

    if (notification != ''){
        return;
    }
    if (startDay == endDay){
        console.log(1)
        setNotification("can't checkin/out on the same day")
        setCost(0)
        setTax(0)
        setNumDays(0)
        setTotal(0)
        return;
    }

    // const 
    localStorage.setItem('numberOfGuests', guest);
    localStorage.setItem('checkinDate', startDay);
    localStorage.setItem('checkoutDate', endDay);
    localStorage.setItem('totalPrice', total);
    localStorage.setItem('propid', pid);
    localStorage.setItem('title', title);
    localStorage.setItem('ownerUsername', host);
    localStorage.setItem('propType', prop_type);

    //price details
    localStorage.setItem('tax', tax);
    localStorage.setItem('cost', cost);
    localStorage.setItem('numDays', numDays);


    setSubmitted(true);
    nativate('/createres')

  }

  useEffect(()=> {
    // setPid(param)
    const data = async () => {

        const request = await Post({'pid':pid},'prop/search/')
        // const result = await Object.values(request[1][0]);
        setPropInfo(request[1][0])
        console.log(request[1][0])

        const allA = await Get('prop/amenity/')
        
        const owner = await Get('prop/'+request[1][0].owner+'/owner/')

        const avaliability = await Get('prop/'+pid+'/time/')
        extractData(request[1][0], allA, owner,avaliability)


    }

    data();
    // console.log(pid)
  },[])

//   if (submitted === true ){
//     // return <redirect to="/" />;
//     navigate("/")
//   }




    return (<PageContainter >
        <Nav/> 
        <main  onClick={() => {
            console.log(startDay)
            console.log(endDay)}
        }>

            {/* title */}
            <section className="intro">
            <div className="property-name">
                <div className="section-title-40">{title}</div>
            </div>
            <div className="ratings-reviews-loc">
                <p>&#9733; 4.98, {location}</p>
            </div>
            </section>

            {/* photo */}
            <section className="property-image">
          <div className="property-image-grid">
            <div className="property-preview">
              <img
                className="prop-img"
                src="./images/properties-detail/1.jpeg"
                alt=""
              />
            </div>
            <div className="property-preview">
              <img
                className="prop-img"
                src="./images/properties-detail/2.jpeg"
                alt=""
              />
            </div>
            <div className="property-preview">
              <img
                className="prop-img"
                src="./images/properties-detail/3.jpeg"
                alt=""
              />
            </div>
            <div className="property-preview">
              <img
                className="prop-img"
                src="./images/properties-detail/4.jpeg"
                alt=""
              />
            </div>
            <div className="property-preview">
              <img
                className="prop-img"
                src="./images/properties-detail/5.jpeg"
                alt=""
              />
            </div>
            <div className="property-preview">
              <img
                className="prop-img"
                src="./images/properties-detail/6.jpeg"
                alt=""
              />
            </div>
          </div>

          
            </section>

            {/* rest */}
            <section className="information-container">
          <div className="info-left-section">
            <div className="general-info">
              <div className="section-title1-first">
                {prop_type} hosted by {host}
              </div>
              <div>
                {avaliable_guests} guests &#8226; {rooms} rooms &#8226; {beds} beds &#8226; {washrooms} washrooms
              </div>
              <hr />
              <div className="text-15">
                    {description}
              </div>
              <hr />
            </div>

            <div className="section-title1">What this place offers</div>
            
            <div className="offer">

                {sa}

            </div>

            <hr />
            <div className="comments-section">
              <div className="section-title1">Ratings and reviews</div>
              <div className="comment-container">
                <div className="comment-heading">
                  <div className="comment-heading-left">
                    <div>
                      <img
                        className="comment-profile-pic"
                        src="images/trump-circle.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="comment-heading-right">
                    <div className="comment-user">Donald Trump</div>
                    <div className="comment-time">November 2018</div>
                  </div>
                </div>
                <div className="comments">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ratione repellat deleniti laborum in iure, laudantium nisi
                  debitis placeat tenetur natus eius cumque culpa dolores
                  explicabo doloremque soluta non neque inventore!
                </div>
              </div>
              <div className="comment-container">
                <div className="comment-heading">
                  <div className="comment-heading-left">
                    <div>
                      <img
                        className="comment-profile-pic"
                        src="images/SeekPng.com_obama-png_274966.png"
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="comment-heading-right">
                    <div className="comment-user">Barack Obama</div>
                    <div className="comment-time">November 2012</div>
                  </div>
                </div>
                <div className="comments">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Ratione repellat deleniti laborum in iure, laudantium nisi
                  debitis placeat tenetur natus eius cumque culpa dolores
                  explicabo doloremque soluta non neque inventore!
                </div>
              </div>
            </div>
            <hr />
            <div className="host-contact-info">
              <div className="section-title1">Hosted by {host}</div>
              <div className="awards">
                10 Reviews &#8226; Identity Verified &#8226; Superhost
              </div>
              <div>Response Rate: 20%</div>
              <div>Usually replies within 2 days</div>
            </div>
            <hr />
          </div>


          <div className="info-right-section">
            <div className="make-res">
              <div className="date-guest-form-container">


                {/* form for ehhhhhh~ */}
                <form  className="date-guest-form" onSubmit={submit}>
                  <div className="section-title1">Reserve now</div>
                  <div className="date-form-row">
                    <div className="check-in-date">
                      <label for="checkin-date">Check-in</label>
                      <input 
                        name="checkin-date" 
                        type="date" 
                        defaultValue={startDay}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setStartDay(e.target.value);
                            updateTotal(e.target.value, -1);
                        }}
                        required/>
                    </div>
                    <div className="check-out-date">
                      <label for="checkout-date">Check-out</label>
                      <input 
                        name="checkout-date" 
                        type="date" 
                        defaultValue={endDay}
                        onChange={(e) => {
                            console.log(e.target.value);
                            setEndDay(e.target.value)
                            updateTotal(-1,e.target.value);

                        }}
                        required
                        />
                    </div>
                  </div>
                  <div className="guest-number-row">
                    <label for="guest-num">Guest number</label>
                    <input name="guest-num" type="text" placeholder="1 guest" 
                        onChange={(e)=>{
                            setGuest(e.target.value)
                            // updateTotal(startDay,endDay)
                        }}
                        required
                    />
                  </div>
                  <div className="submit-button-row">
                    <span className="form-label"></span>
                    <div className="button-input">
                      <button type="submit" className="btn0">
                        Reserve
                      </button>
                    </div>
                  </div>
                </form>
              </div>

                {/* charge for selected date */}
                {notification}
              <div className="price-details-conatiner">
                <div className="section-title1">Price details</div>
                <div className="price-container">
                  <div class="row" defaultValue={0}>&#36; {cost} for {numDays} Days</div>
                  <div class="row">&#36; {tax} Tax</div>
                  <hr class="hr-last" />
                  <div class="row">&#36; {total} Total</div>
                </div>
              </div>



            </div>
          </div>
            </section>

        </main>

    
        </PageContainter>
    )
};

export default PropDetail;