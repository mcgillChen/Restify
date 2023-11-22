import React, { useState, useEffect } from "react";
import "./styles.css";
import HostUpdateStatusButton from "./HostReservationAction";

const ReservationsListHost = ({ status }) => {
  const [reservations, setReservations] = useState([]); //set default to empty array

  const fetchHostReservations = () => {
    const access_token = "Bearer " + localStorage.getItem("accessToken");

    const url = `http://127.0.0.1:8000/reservations/reservations-details-all/filter?usertype=HOST&status=${status}`;

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
    fetchHostReservations();
  }, []);

  if (status === "PENDING") {
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
            <HostUpdateStatusButton
              reservationId={reservation.id}
              newStatus={"APPROVED"}
              onUpdate={fetchHostReservations}
              button_text={"Approve"}
            ></HostUpdateStatusButton>
            <br></br>
            <HostUpdateStatusButton
              reservationId={reservation.id}
              newStatus={"DENIED"}
              onUpdate={fetchHostReservations}
              button_text={"Deny"}
            ></HostUpdateStatusButton>
          </div>
      );
    });
  } else if (status === "APPROVED") {
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
            <HostUpdateStatusButton
              reservationId={reservation.id}
              newStatus={"TERMINATED"}
              onUpdate={fetchHostReservations}
              button_text={"Terminate"}
            ></HostUpdateStatusButton>
            <br></br>
          </div>
      );
    });
  } else if (status === "PENDINGCANCELLED") {
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
            <HostUpdateStatusButton
              reservationId={reservation.id}
              newStatus={"CANCELED"}
              onUpdate={fetchHostReservations}
              button_text={"Approve"}
            ></HostUpdateStatusButton>
            <br></br>

            <HostUpdateStatusButton
              reservationId={reservation.id}
              newStatus={"APPROVED"}
              onUpdate={fetchHostReservations}
              button_text={"Deny"}
            ></HostUpdateStatusButton>
            <br></br>
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

export default ReservationsListHost;
