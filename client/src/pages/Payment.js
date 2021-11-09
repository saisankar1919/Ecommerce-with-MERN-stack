import React, { useEffect, useState } from "react";
import Axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import StripeCheckout from "../components/StripeCheckout";
import "../stripe.css";
import { PayPalButton } from "react-paypal-button-v2";
import { useLocation } from 'react-router-dom';


// load stripe outside of components render to avoid recreating stripe object on every render
const promise = loadStripe(process.env.REACT_APP_STRIPE_KEY);

const Payment = (props) => {
const location = useLocation();
const total = location.state; // it is equal to yourData
console.log(total)
  const [sdkReady, setSdkReady] = useState(false);

  // useEffect(async () => {
  //   const { data } = await Axios.get("/api/config/paypal");
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  //   document.body.appendChild(script);
  // }, []);
  const totalPrice = 1000

  const successPaymentHandler = ()=>{

  }

  return (
    <div className="container p-5 text-center" style={{ marginTop: "78px" }}>
      {/* <h4>Complete your purchase</h4> */}
      <Elements stripe={promise}>
        <div className="col-md-8 offset-md-2">
          <StripeCheckout />
          
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
