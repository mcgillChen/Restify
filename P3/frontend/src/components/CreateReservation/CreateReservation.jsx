import React, { useState, useEffect } from "react";
import "./styles.css";

const CreateReservation = () => {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //default pressing the button will refresh the page

    //TODO: Change this after we finish the property-detail page
    const numberOfGuests = localStorage.getItem("numberOfGuests");
    const checkinDate = localStorage.getItem("checkinDate");
    const checkoutDate = localStorage.getItem("checkoutDate");
    const totalPrice = localStorage.getItem("totalPrice");
    const propid = localStorage.getItem("propid");

    //if we screw up total price some how
    if (!totalPrice) {
      totalPrice = 0;
      console.log("Error with getting totalPrice from local storage");
    }
    

    //! hard code for now
    // const numberOfGuests = 10;
    // const checkinDate = "2024-10-19";
    // const checkoutDate = "2024-10-20";
    // const totalPrice = "100.00";
    // const propid = 1;

    const data = {
      number_of_guests: numberOfGuests,
      checkin_date: checkinDate,
      checkout_date: checkoutDate,
      total_price: totalPrice,
      propid: propid,
      special_request: message, //from the form
    };

    try {
      const access_token = "Bearer " + localStorage.getItem("accessToken");
      const url = `http://127.0.0.1:8000/reservations/create-reservation/`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: access_token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Reservation created:", data);
        setErrorMessage(""); // Clear any previous error message.
        setSuccessMessage(""); // Clear any previous error message.
        setSuccessMessage(
          "Reservation request submitted successfully! The host will approve/deny you request shortly"
        );
      } else if (response.status === 400) {
        const errorData = (await response.text()).slice(2, -2);
        setErrorMessage("");
        setSuccessMessage("");
        setErrorMessage(errorData);
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error creating reservation:", error);
    }
  };

  return (
    <div className="contact-host-row">
      <div className="section-title1">Message the host</div>
      <div className="section-subtitle-0">Any messages to the host</div>
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          rows="5"
          name="comment"
          placeholder="Enter your message here"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <hr />
        <button type="submit" className="btn0">
          Request to book
        </button>
      </form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </div>
  );
};

export default CreateReservation;
