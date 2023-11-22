import React from "react";
import Nav from "../../components/NavBar/NavBar";
import PageContainter from "../../components/PageTemplate/PageContainter";
import "./styles.css";
import CreateReservation from "../../components/CreateReservation/CreateReservation";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function CreateReservationPage() {
  // property details
  const title = localStorage.getItem("title");
  const numberOfGuests = localStorage.getItem("numberOfGuests");
  const checkinDate = localStorage.getItem("checkinDate");
  const checkoutDate = localStorage.getItem("checkoutDate");
  const ownerUsername = localStorage.getItem("ownerUsername");
  const prop_type = localStorage.getItem("propType");
  const propid = localStorage.getItem("propid");

  //price details
  const cost = localStorage.getItem("cost");
  const numDays = localStorage.getItem("numDays");
  const tax = localStorage.getItem("tax");
  const totalPrice = localStorage.getItem("totalPrice");

  //if cant get total price
  if (!totalPrice) {
    totalPrice = 0;
    console.log("Error with getting totalPrice from local storage");
  }

  //property detail page url
  const propPageURL = `/propdetail/${propid}/`;

  return (
    <PageContainter>
      <Nav />
      <div className="container">
        <main>
          <div className="request-reservation-middle-section-container">
            <div className="section-title-40">Request to Book</div>
            <div>
              <Link className="back" to={propPageURL}>
                Back to property
              </Link>
            </div>
            <div className="information-container">
              <div className="info-right-section">
                <div className="make-res-row">
                  <div className="reservation-unit-card-container">
                    <div className="reservation-unit-card">
                      <div className="unit-card-details">
                        <div className="section-title1">{title}</div>
                        <div>{prop_type}</div>
                        <div>Hosted by {ownerUsername}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="price-details-container">
                  <div className="section-title1">Price details</div>
                  <div className="row">
                    &#36;{cost} CAD x {numDays} Nights
                  </div>
                  <div className="row">&#36;{tax} CAD Tax</div>
                  <hr className="hr-last" />
                  <div className="row">&#36;{totalPrice} CAD Total</div>
                </div>
              </div>

              <div className="info-left-section">
                <div className="your-trip-row">
                  <div className="section-title1">Your Trip:</div>
                  <div className="dates">
                    <div className="section-title2">Dates:</div>
                    <div>
                      {checkinDate}- {checkoutDate}
                    </div>
                  </div>
                  <div className="guests">
                    <div className="section-title2">Guests</div>
                    <div>{numberOfGuests}</div>
                  </div>
                </div>
                <hr />
                <div className="pay-now-row-container">
                  <div className="paynow-row">
                    <div className="section-title1">Pay Now</div>
                    <form action="#" className="credit-card-form">
                      <div className="input-row">
                        <label>Card number</label>
                        <input
                          type="text"
                          placeholder="0000 0000 0000 0000"
                          required
                        />
                      </div>
                      <div className="input-row">
                        <label>Name on card</label>
                        <input
                          type="text"
                          placeholder="Ex. Joe Biden"
                          required
                        />
                      </div>
                      <div className="exp-date-cvv-row">
                        <div className="input-row">
                          <label>Expiration date</label>
                          <input type="text" placeholder="MM/YY" required />
                        </div>
                        <div className="input-row">
                          <label>CVV</label>
                          <input type="text" placeholder="CVV" required />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <hr />
                <div className="cancellation-policy-row">
                  <div className="section-title1">Cancellation Policy:</div>
                  <div className="text-14">
                    Free cancellation for 48 hours. Cancel before "DEADLINE" for
                    a partial refund
                  </div>
                </div>
                <hr />
                <CreateReservation></CreateReservation>
                <hr />
                <div className="request-button-row">
                  <div className="disclaimer-row">
                    <div className="text-9">
                      By selecting the button above, I agree to the Host's House
                      Rules, Ground rules for guests, Restify's Rebooking and
                      Refund Policy, and that Restify can charge my payment
                      method if I’m responsible for damage. I agree to pay the
                      total amount shown if the Host accepts my booking request.
                      I also agree to the updated Terms of Service, Payments
                      Terms of Service, and I acknowledge the Privacy Policy.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageContainter>
  );
}

export default CreateReservationPage;
