import React from "react";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import ReservationsListGuest from "../../components/Reservations/ReservationsListGuest";
import "./styles.css";
import { Link } from "react-router-dom";

import { useAPIContext } from "../../contexts/APIContexts";
function MyReservationGuest() {
  return (
    <PageContainter>
      <Nav />
      <div className="container">
        <main>
          <section className="intro">
            <div className="property-name">
              <div className="section-title-40">Your Reservations(Guest)</div>
            </div>
          </section>
          <section className="present-reservations">
            <div className="sub-headers">
              <p>Approved Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="APPROVED"></ReservationsListGuest>
            </div>
          </section>
          <section className="pending-reservations">
            <hr />
            <div className="sub-headers">
              <p>Pending Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="PENDING"></ReservationsListGuest>
            </div>
          </section>
          <section className="pending-reservations">
            <hr />

            <div className="sub-headers">
              <p>Pending-Cancelled Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="PENDINGCANCELLED"></ReservationsListGuest>
            </div>
          </section>
          <section className="pending-reservations">
            <hr />

            <div className="sub-headers">
              <p>Completed Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="COMPLETED"></ReservationsListGuest>
            </div>
          </section>

          <section className="pending-reservations">
            <hr />

            <div className="sub-headers">
              <p>Denied Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="DENIED"></ReservationsListGuest>
            </div>
          </section>
          <section className="past-reservations">
            <hr />

            <div className="sub-headers">
              <p> Cancelled Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="CANCELED"></ReservationsListGuest>
            </div>
          </section>
          <section className="past-reservations">
            <hr />

            <div className="sub-headers">
              <p> Terminated Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="TERMINATED"></ReservationsListGuest>
            </div>
          </section>
          <section className="past-reservations">
            <hr />

            <div className="sub-headers">
              <p>Expired Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListGuest status="EXPIRED"></ReservationsListGuest>
            </div>
          </section>
        </main>
      </div>
    </PageContainter>
  );
}

export default MyReservationGuest;
