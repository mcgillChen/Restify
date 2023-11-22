import React from "react";
import ReservationsListHost from "./ReservationsListHost";

const HostUpdateStatusButton = ({ reservationId, newStatus, onUpdate, button_text }) => {
  const updateStatus = () => {
    const access_token = "Bearer " + localStorage.getItem("accessToken");
    const url = `http://127.0.0.1:8000/reservations/host-update-reservation/${reservationId}/`;

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: access_token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Refresh reservations data after successful update
        onUpdate();
        window.location.reload();

      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return <button onClick={updateStatus}>{button_text}</button>;
};

export default HostUpdateStatusButton;