import React, { useState, useEffect } from "react";
import "./styles.css";
import GuestCancelStatusButton from "./GuestReservationAction";

const ReservationsListGuest = ({ status }) => {
  const [reservations, setReservations] = useState([]); //set default to empty array
  // useEffect(() => {
  //   // get access token
  //   const access_token = "Bearer " + localStorage.getItem("accessToken");
  //   // const access_token =
  //   //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzI3ODk0LCJpYXQiOjE2ODEyNDE0OTQsImp0aSI6ImEzNDdmZjBlMjQ1NDQxY2JiNjM4NGZiOWFiYWIyZWEyIiwidXNlcl9pZCI6M30.txr4yacw4QkDjjbbD6oPM1THtAsGnwwgw6SEp9Syn_4";
  //   // console.log("at: " + access_token);

  //   // const url = "http://127.0.0.1:8000/reservations/reservations-details-all/";
  //   const url = `http://127.0.0.1:8000/reservations/reservations-details-all/filter?usertype=GUEST&status=${status}`;

  //   fetch(url, {
  //     headers: {
  //       Authorization: access_token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       setReservations(data);
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //     });
  // }, []);

  const fetchGuestReservations = () => {
    const access_token = "Bearer " + localStorage.getItem("accessToken");
    // const access_token =
    //   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjgxMzI3ODk0LCJpYXQiOjE2ODEyNDE0OTQsImp0aSI6ImEzNDdmZjBlMjQ1NDQxY2JiNjM4NGZiOWFiYWIyZWEyIiwidXNlcl9pZCI6M30.txr4yacw4QkDjjbbD6oPM1THtAsGnwwgw6SEp9Syn_4";
    // console.log("at: " + access_token);

    const url = `http://127.0.0.1:8000/reservations/reservations-details-all/filter?usertype=GUEST&status=${status}`;

    fetch(url, {
      headers: {
        Authorization: access_token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setReservations(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetchGuestReservations();
  }, []);

  if (status === "APPROVED") {
    return reservations.map((reservation) => {
      return (
        <div className="unit-card-container" key={reservation.id}>
          <div className="unit-card-title">{reservation.property.title}</div>
          <div className="unit-card-date">res id: {reservation.id}</div>
          <div className="unit-card-date">
            Guest: {reservation.user.username}
          </div>
          <div className="unit-card-date">
            Check-in: {reservation.checkin_date}
          </div>
          <div className="unit-card-date">
            Check-out: {reservation.checkout_date}
          </div>
          <div className="unit-card-date">
            {reservation.number_of_guests} Guests
          </div>
          <div className="unit-card-date">
            <GuestCancelStatusButton
              reservationId={reservation.id}
              newStatus={"PENDINGCANCELLED"}
              onUpdate={fetchGuestReservations}
            ></GuestCancelStatusButton>
          </div>
        </div>
      );
    });
  } else {
    return reservations.map((reservation) => {
      return (
        <div className="unit-card-container" key={reservation.id}>
          <div className="unit-card-title">{reservation.property.title}</div>
          <div className="unit-card-date">res id: {reservation.id}</div>

          <div className="unit-card-date">
            Guest: {reservation.user.username}
          </div>
          <div className="unit-card-date">
            Check-in: {reservation.checkin_date}
          </div>
          <div className="unit-card-date">
            Check-out: {reservation.checkout_date}
          </div>
          <div className="unit-card-date">
            {reservation.number_of_guests} Guests
          </div>
        </div>
      );
    });
  }
};

export default ReservationsListGuest;
