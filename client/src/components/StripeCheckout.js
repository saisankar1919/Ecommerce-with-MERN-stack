import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useSelector, useDispatch } from "react-redux";
import { createPaymentIntent } from "../functions/stripe";
import { Link } from "react-router-dom";
import { Card } from "antd";
import { DollarOutlined, CheckOutlined, SwapOutlined } from "@ant-design/icons";
import Laptop from "../images/laptop.png";
import { createOrder, emptyUserCart } from "../functions/user";
import Axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { toast } from "react-toastify";

const StripeCheckout = ({ history }) => {
  const dispatch = useDispatch();
  const { user, coupon } = useSelector((state) => ({ ...state }));

  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState("");

  const [cartTotal, setCartTotal] = useState(0);
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [payable, setPayable] = useState(0);

  const stripe = useStripe();
  const elements = useElements();
  const [sdkReady, setSdkReady] = useState(false);

  // const successPaymentHandler = (paymentResult) => {
  //   // dispatch(payOrder(order, paymentResult));
  // };

  useEffect(() => {
    createPaymentIntent(user.token, coupon).then((res) => {
      console.log("create payment intent", res.data);
      // setClientSecret(res.data.clientSecret);
      // additional response received on successful payment
      setCartTotal(res.data.cartTotal);
      setTotalAfterDiscount(res.data.totalAfterDiscount);
      setPayable(res.data.payable);

      const { data } = Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    });

    // addPayPalScript();
  }, []);

  // const addPayPalScript = async () => {
  //   const { data } = await Axios.get("/api/config/paypal");
  //   const script = document.createElement("script");
  //   script.type = "text/javascript";
  //   script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
  //   script.async = true;
  //   script.onload = () => {
  //     setSdkReady(true);
  //   };
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: e.target.name.value,
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // here you get result after successful payment
      // create order and save in database for admin to process
      createOrder(payload, user.token).then((res) => {
        if (res.data.ok) {
          // empty cart from local storage
          if (typeof window !== "undefined") localStorage.removeItem("cart");
          // empty cart from redux
          dispatch({
            type: "ADD_TO_CART",
            payload: [],
          });
          // reset coupon to false
          dispatch({
            type: "COUPON_APPLIED",
            payload: false,
          });
          // empty cart from database
          emptyUserCart(user.token);
        }
      });
      // empty user cart from redux store and local storage
      console.log(JSON.stringify(payload, null, 4));
      setError(null);
      setProcessing(false);
      setSucceeded(true);
      // history.push('/')
    }
  };

  const handleChange = async (e) => {
    // listen for changes in the card element
    // and display any errors as the custoemr types their card details
    setDisabled(e.empty); // disable pay button if errors
    setError(e.error ? e.error.message : ""); // show error message
  };

  const cartStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    const payload = paymentResult;
    console.log(payload);
    createOrder(payload, user.token).then((res) => {
      if (res.data.ok) {
        // empty cart from local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty cart from redux
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // reset coupon to false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty cart from database
        emptyUserCart(user.token);
      }
    });
    // empty user cart from redux store and local storage
    console.log(JSON.stringify(payload, null, 4));
    setError(null);
    setProcessing(false);
    setSucceeded(true);
    toast.success('Order placed successfuly')
  };

  const redirect = ()=>{
    history.push('/')
  }

  return (
    <>
      {!succeeded ? (
        <div>
          {coupon && totalAfterDiscount !== undefined ? (
            <p className="alert alert-success">{`Total after discount: $${totalAfterDiscount}`}</p>
          ) : (
            <p className="alert alert-danger">No coupon applied</p>
          )}
          <div>
             {coupon && totalAfterDiscount !== undefined ? (
        <div id="payment-form" className="stripe-form">
          <PayPalButton
            amount={totalAfterDiscount}
            onSuccess={successPaymentHandler}
          ></PayPalButton>
        </div>
      ) : (
        <PayPalButton
          amount={cartTotal}
          onSuccess={successPaymentHandler}
        ></PayPalButton>
      )}
          </div>
        </div>
      ):(
        // redirect()
      <div><h1> <span style={{color:'green',fontSize:'50px'}}>Congrations...!</span> <br /> Your Order placed successfuly</h1></div>
      )}
      {/* <div className="text-center pb-5">
        <Card
          cover={
            <img
              src={Laptop}
              style={{
                height: "200px",
                objectFit: "cover",
                marginBottom: "-50px",
              }}
            />
          }
          actions={[
            <>
              <DollarOutlined className="text-info" /> <br /> Total: $
              {cartTotal}
            </>,
            <>
              <CheckOutlined className="text-info" /> <br /> Total payable : $
              {(payable / 100).toFixed(2)}
            </>,
          ]}
        />
      </div> */}
      
     
    </>
  );
};

export default StripeCheckout;
