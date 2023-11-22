import React, { useEffect, useState } from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import CreatePropForm from "../../components/Forms/CreatePropForm/CreatePropForm";
import EditPropForm from "../../components/Forms/EditPropForm/EditPropForm";
import "./styles.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Get from "../api/Get";
import Calendar from "react-calendar";
import PropDateInfoForm from "../../components/Forms/PropDateInfoForm/PropDateInfoForm";
import AuthPatch from "../api/AuthPatch";
import AuthPost from "../api/AuthPost";
import AuthDelete from "../api/AuthDelete";
import Post from "../api/Post";

function ActivateProp() {
  // let { pid } = useParams();
  let { pid } = useParams();
  // var [pid, setPid] = useState();

  const [propActivity, setPropActivity] = useState();
  const [selectedDate, setSelectedDate] = useState("");
  const [existingActivity, setExistingActivity] = useState({});
  const [notification, setNotification] = useState();

  const [price, setPrice] = useState();

  const [error, setError] = useState();
  // return a dict: date:[date, pid,apid,price]
  function processData(objList) {
    var dict = {};
    for (let apinstance of objList) {
      dict[apinstance.date.toString()] = [
        apinstance.date,
        apinstance.pid,
        apinstance.id,
        apinstance.price,
      ];
    }
    setExistingActivity(dict);
    // console.log(existingActivity)
  }

  function formatDate(e) {
    let year = e.getFullYear();
    let month = e.getMonth() + 1;
    let date = e.getDate();

    if (month < 10) {
      month = "0" + month.toString();
    }
    if (date < 10) {
      date = "0" + date.toString();
    }
    return year + "-" + month + "-" + date;
  }

  function updateExistingDict(key, value) {
    // console.log(key + "\n" + value)
    setExistingActivity((existingActivity) => ({
      ...existingActivity,
      [key]: value,
      // key :[result[1][1],result[1][3], result[1][2], result[1][4]]
    }));
  }

  async function submit(e) {
    e.preventDefault();

    if (price == 0) {
      setNotification([
        "price equal to 0 means property is unavaliable on " + selectedDate,
      ]);
    }

    var url = "";
    // create if not exist
    var query;
    var result;
    console.log(existingActivity);
    console.log(selectedDate);
    console.log(existingActivity[selectedDate]);
    if (existingActivity[selectedDate] == null) {
      url = "prop/activate/";
      query = {
        date: selectedDate,
        price: price,
        pid: pid,
      };
      console.log("url: " + url);
      console.log(query);

      // if (price == 0){
      //   setNotification("price equal to 0 means property is unavaliable on " + selectedDate)
      //   return;
      // }

      result = await AuthPost(query, url);
    } else {
      url = "prop/" + existingActivity[selectedDate][2] + "/update/";
      if (price == 0) {
        result = await AuthDelete(url);
      } else {
        query = {
          price: price,
        };

        console.log("url: " + url);
        console.log(query);

        result = await AuthPatch(query, url);
      }
    }
    console.log(result[0]);

    if (result[0] < 200 || result[0] >= 300) {
      console.log(Object.keys(result[1]).length);

      setError(result[1]);
    } else {
      console.log("success");
      // console.log(Object.values(result[1]))
      var item = Object.values(result[1]);
      const key = item[1][1];
      // console.log([item[1],item[3], item[0], item[2]])
      // key :[item[1][1],item[1][3], item[1][2], item[1][4]]

      if (price != 0) {
        setNotification(
          "property activated on " + selectedDate + " for $" + price
        );
        updateExistingDict(item[1], [item[1], item[3], item[0], item[2]]);
      } else {
        setNotification("property deactivated on " + selectedDate);
        const newItems = { ...existingActivity };
        delete newItems[selectedDate];
        setExistingActivity(newItems);
      }
      setError("");

      // navigate("/createprop");
    }
  }

  const [title, setTitle] = useState("");

  useEffect(() => {
    const data = async () => {
      var result = await Get("prop/" + pid + "/time/");
      var data = await Object.values(result);
      setPropActivity(data);
      processData(data);

      const propVal = await Post({ pid: pid }, "prop/search/");
      const propdata = await Object.values(propVal);
      console.log(propdata[1][0].title);
      setTitle(propdata[1][0].title);
    };
    data();
    setSelectedDate();
    console.log(pid);
  }, []);

  return (
    <div>
      <Nav />

      <PageContainter>
        <main className="prop-setup-main">
          <div className="prop-setup-form-container">
            <div className="page-heading" styles={{ display: "inline" }}>
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
            </div>

            <Calendar
              onChange={(e) => {
                console.log(e);
                // console.log(propActivity)
                console.log(existingActivity);
                // console.log(e.getFullYear()+"-"+(e.getMonth()+1).toString()+"-"+e.getDate())
                // setSelectedDate(e.getFullYear()+"-"+(e.getMonth()+1).toString()+"-"+e.getDate())
                setNotification("");
                console.log(formatDate(e));
                setSelectedDate(formatDate(e));
                // console.log(existingActivity[formatDate(e)])
                if (existingActivity[formatDate(e)] != null) {
                  setPrice(existingActivity[formatDate(e)][3]);
                } else {
                  // console.log('resetting price')
                  setPrice(0);
                }
                console.log(formatDate(e) in existingActivity);
              }}
              value={selectedDate}
            />

            <h1>Selected day: {selectedDate}</h1>

            <form
              className="setup-property-form"
              onSubmit={submit}
              // onSubmit={console.log(price)}
            >
              <label htmlFor="prop-price">Price:</label>
              <div className="prop-price-container">
                <input
                  id="prop-price"
                  type="text"
                  // placeholder=
                  onChange={(e) => {
                    setPrice(e.target.value);

                    if (
                      existingActivity[selectedDate] != null &&
                      e.target.value == 0
                    ) {
                      setNotification(
                        "setting price 0 will deactivate property for " +
                          selectedDate
                      );
                    } else {
                      setNotification("");
                    }
                  }}
                  value={price}
                  defaultValue={price}
                  required
                />
              </div>
              <br />

              {notification}
              <hr />
              {error &&
                Object.keys(error).map((key, msg) => {
                  return (
                    <p id={"error-" + key}>{key + ": " + error[key][0]}</p>
                  );
                })}

              <input className="submit" type="submit" value="Submit" />
            </form>
          </div>
        </main>
      </PageContainter>
    </div>
  );
}

export default ActivateProp;
