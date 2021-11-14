import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "../../components/order/Report";
import jsPDF from "jspdf";
import "jspdf-autotable";
import DatePicker from "react-datepicker";
import axios from 'axios';
import Moment from 'moment';

const SalesReport = () => {
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { user } = useSelector((state) => ({ ...state }));
  const [filterdata, setFilterData] = useState()
  console.log(orders);
  // let date = startDate.toISOString() 
  console.log(startDate)
  console.log(endDate);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);

    const title = "Sales Report";
    const headers = [
      ["Order Id", "User Id", "Product", "Order Status", "Date"],
    ];

    const data = orders.map((elt) => [
      elt._id,
      elt.orderdBy,
      elt.products.map((pro) => [pro._id]),
      elt.orderStatus,
      elt.createdAt,
    ]);

    let content = {
      startY: 50,
      head: headers,
      body: data,
      //   theme: 'grid',
      styles: {
        overflow: "linebreak",
        // fontSize: 12,
        valign: "middle",
      },
      columnStyles: {
        0: {
          columnWidth: 100,
          fontStyle: "bold",
          halign: "center",
        },
        1: {
          columnWidth: 100,
          fontStyle: "bold",
          halign: "center",
        },
        2: {
          columnWidth: 100,
          fontStyle: "bold",
          halign: "center",
        },
        3: {
          columnWidth: 100,
          fontStyle: "bold",
          halign: "center",
        },
        4: {
          columnWidth: 100,
          fontStyle: "bold",
          halign: "center",
        },
      },
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  const onFilter = (startDate,endDate)=>{
    
    console.log(startDate)
    axios.get("http://localhost:8000/api/admin/datefilter",{ startDate, endDate }).then((res)=>{
      console.log(res)
      setFilterData(res)
    })
  }

//   getSorrtedReport:(type)=>{
//     console.log("+++++++++++++++++++++++");
//     console.log(type);
//    const numberOfDays = type ===  'daily'? 1 : type === 'weekly' ? 7 : type === 'monthly' ? 30 : type === 'yearly' ? 365 : 0
//    const dayOfYear = (date) =>
//        Math.floor(
//            (date - new Date(date.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24
//        )
//    return new Promise(async (resolve, reject) => {
//        const data = await db.get().collection(collection.ORDER_COLLECTIONS).aggregate([
//            {
//                $match: {
//                    //$and: [{ status: { $eq: 'placed' } }],
//                    createdAt: { $gte: new Date(new Date() - numberOfDays * 60 * 60 * 24 * 1000) },
//                },
//            },


//        ]).toArray()
//        console.log(data);
//        resolve(data)

//    })
// },

  return (
    <div style={{ marginTop: "75px" }}>
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          <h2>Sales Report</h2>
          {/* <p>The .table-hover className enables a hover state on table rows:</p> */}
          <div style={{ textAlign: "right", marginRight: "20px" }}>
            <button className="btn btn-primary" onClick={() => exportPDF()} style={{color:'rgb(87 67 67)'}}>
              Download
            </button>
          </div>
          <div className="row">
            <div className="col-md-1">
              <button className='btn btn-outline-primary' style={{borderColor:'rgb(87 67 67)',color:"rgb(87 67 67)"}}>Monthly</button>
            </div>
            <div className="col-md-1">
              <button className='btn btn-outline-primary' style={{marginLeft:"7px",borderColor:'rgb(87 67 67)',color:"rgb(87 67 67)"}}>Weekly</button>
            </div>
            <div className="col-md-1">
              <button className='btn btn-outline-primary' style={{borderColor:'rgb(87 67 67)',color:"rgb(87 67 67)"}}>Daily</button>
            </div>
            {/* <div className="col-md-2">
              <label htmlFor="startdate">From</label>
              <DatePicker
                className="form-control"
                id="startdate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="startdate">To</label>
              <DatePicker
                className="form-control"
                id="enddate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
              />
            </div> */}
            {/* <div className="col-md-2">
              <button className="btn btn-primary" onClick={onFilter} style={{color:'rgb(87 67 67)'}}>Filter</button>
            </div> */}
          </div>

          <table className="table table-hover">
            <thead>
              <tr>
                <th>Order Id</th>
                <th>User Id</th>
                <th>Product</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, k) => (
                <tr key={k}>
                  <td>{o._id}</td>
                  <td>{o.orderdBy}</td>
                  {o.products.map((p, key) => (
                    <tr>
                      <td>{p._id}</td>
                    </tr>
                  ))}
                  {o.orderStatus != 'Cancelled'?(<td>{o.orderStatus}</td>):(<td><span style={{color:'red'}}>{o.orderStatus}</span></td>)}
                  <td>{o.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
