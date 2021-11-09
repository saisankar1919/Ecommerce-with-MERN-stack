import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "../../components/order/Report";


const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <div className="" style={{ color: "white", marginTop: "78px" }}>
      <div className="row">
        <div className="col-md-2" style={{}}>
          <AdminNav />
        </div>

        <div className="col-md-10">
          <h4 style={{ color: "black" }}></h4>
          {/* {JSON.stringify(orders)} */}
          {/* <PDFDownloadLink
            document={<Report order={orders} />}
            fileName="invoice_Brand24.pdf"
            className="btn btn-sm btn-block btn-outline-primary"
          >
            Download PDF
          </PDFDownloadLink> */}
          <Orders orders={orders} handleStatusChange={handleStatusChange} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
