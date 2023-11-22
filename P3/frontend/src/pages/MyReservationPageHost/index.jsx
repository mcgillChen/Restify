import React from "react";
import LoginForm from "../../components/Forms/LoginForm/LoginForm";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import ReservationsListHost from "../../components/Reservations/ReservationsListHost";

import "./styles.css";
import { Link } from "react-router-dom";

import { useAPIContext } from "../../contexts/APIContexts";
function MyReservationHost() {
  return (
    <PageContainter>
      <Nav />
      <div className="container">
        <main>
          <section className="intro">
            <div className="property-name">
              <div className="section-title-40">Your Reservations(Host)</div>
            </div>
          </section>
          <section className="present-reservations">
            <div className="sub-headers">
              <p>Approved Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="APPROVED"></ReservationsListHost>
            </div>
          </section>
          <section className="pending-reservations">
            <hr />

            <div className="sub-headers">
              <p>Pending Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="PENDING"></ReservationsListHost>
            </div>
          </section>
          <section className="pending-reservations">
            <hr />

            <div className="sub-headers">
              <p>Pending-Cancelled Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="PENDINGCANCELLED"></ReservationsListHost>
            </div>
          </section>
          <section className="pending-reservations">
            <hr />

            <div className="sub-headers">
              <p>Completed Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="COMPLETED"></ReservationsListHost>
            </div>
          </section>

          <section className="pending-reservations">
            <hr />

            <div className="sub-headers">
              <p>Denied Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="DENIED"></ReservationsListHost>
            </div>
          </section>
          <section className="past-reservations">
            <hr />

            <div className="sub-headers">
              <p> Cancelled Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="CANCELED"></ReservationsListHost>
            </div>
          </section>
          <section className="past-reservations">
            <hr />

            <div className="sub-headers">
              <p> Terminated Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="TERMINATED"></ReservationsListHost>
            </div>
          </section>
          <section className="past-reservations">
            <hr />

            <div className="sub-headers">
              <p>Expired Reservations</p>
            </div>
            <div className="scrolling-wrapper">
              <ReservationsListHost status="EXPIRED"></ReservationsListHost>
            </div>
          </section>
        </main>
      </div>
    </PageContainter>
  );
}

export default MyReservationHost;
