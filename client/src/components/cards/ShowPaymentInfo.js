import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true }) => (
  <div>
    <p>
      <span>Order Id: {order._id}</span>
      {" / "}
      {/* <span>
        Amount:{" / "}
        {(order.amount /= 100).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        })}
      </span>
      {" / "} */}
      {/* <span>Currency: {order.paymentIntent.currency.toUpperCase()}</span>
      {" / "} */}
      {/* <span>Method: {order.paymentIntent.payment_method_types[0]}</span>
      {" / "} */}
      <span>Payment: {order.paymentIntent.status.toUpperCase()}</span>
      {" / "}
      {/* <span>
        Orderd on:{" / "}
        {new Date(order.paymentIntent.created * 1000).toLocaleString()}
      </span>
      {" / "} */}
      <br />
      {showStatus && order.orderStatus !='Cancelled'?(
        <span className="badge text-white" style={{backgroundColor:'rgb(87 67 67)'}}>
          STATUS: {order.orderStatus}
        </span>
      ):(
        <span className="badge text-white" style={{backgroundColor:'red'}}>
          STATUS: {order.orderStatus}
        </span>
      )}
    </p>
  </div>
);

export default ShowPaymentInfo;
