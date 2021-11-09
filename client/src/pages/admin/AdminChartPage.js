import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import Report from "../../components/order/Report";
// import { Doughnut } from "react-chartjs-2";
import axios from "axios";
import { FiUsers } from "react-icons/fi";
import { GiAmpleDress } from "react-icons/gi";
import { ImDropbox } from "react-icons/im";
// import { Doughnut } from 'react-chartjs-2';
import { Line } from "react-chartjs-2";
import {Doughnut} from 'react-chartjs-2';


const AdminChartPage = () => {
  const [ordercount, setOrdercount] = useState();
  const [usercount, setUsercount] = useState();
  const [productcount, setProductcount] = useState();
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();

  console.log(categories)
  


  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    orderCount();
    userCount();
    productCount();
    getCategories();
    getProducts();
  }, []);

  const orderCount = () => {
    axios.get("http://localhost:8000/api/admin/ordercount").then((res) => {
      console.log(res.data);
      setOrdercount(res.data);
    });
  };
  const userCount = () => {
    axios.get("http://localhost:8000/api/admin/usercount").then((res) => {
      console.log(res.data);
      setUsercount(res.data);
    });
  };

  const productCount = () => {
    axios.get("http://localhost:8000/api/admin/productcount").then((res) => {
      console.log(res.data);
      setProductcount(res.data);
    });
  };

  const getCategories = () =>{
      axios.get("http://localhost:8000/api/categories").then((res)=>{
          let value = res.data
        
          setCategories(res.data)
      })
  }

  const getProducts = () =>{
    axios.get("http://localhost:8000/api/products/listall").then((res)=>{
        let value = res.data
      
        setProducts(res.data)
    })
}

  
  let productname = products?.map((i)=>i.title);
  let productSoled = products?.map((i)=>i.sold)
  const data = {
    labels: productname,
    

    datasets: [
      {
        label: "Sales per Product",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        innerWidth:10,
        pointHitRadius: 10,
        data: productSoled,
      },
    ],
  };
  
  // this is for taking the categories form array of object
  const labels= categories?.map((i)=>i.name)

  // const categoryCount = categories.length
  
  const dataround = {
    labels: labels,
    datasets: [{
      data: [3,2,2],
      backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56'
      ]
    }]
  };
  //   const loadOrders = () =>
  //     getOrders(user.token).then((res) => {
  //       console.log(JSON.stringify(res.data, null, 4));
  //       setOrders(res.data);
  //     });

  //   const handleStatusChange = (orderId, orderStatus) => {
  //     changeStatus(orderId, orderStatus, user.token).then((res) => {
  //       toast.success("Status updated");
  //       loadOrders();
  //     });
  //   };

  return (
    <div className="" style={{ color: "white", marginTop: "78px" }}>
      <div className="row">
        <div className="col-md-2" style={{}}>
          <AdminNav />
        </div>
        <div className="col-md-10" style={{ justifyContent: "space-between" }}>
          <div class="row" style={{ paddingTop: "20px" }}>
            <div class="col-md-4" style={{ textAlign: "center" }}>
              <div
                class="card"
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "#d9cccc",
                }}
              >
                <p>
                  <FiUsers style={{ color: "black", fontSize: "30px" }} />
                </p>
                <h2 style={{ color: "black" }}>{usercount}</h2>
                <p style={{ color: "black", fontSize: "20px" }}>Users</p>
              </div>
            </div>

            <div class="col-md-4" style={{ textAlign: "center" }}>
              <div
                class="card"
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "#d9cccc",
                }}
              >
                <p>
                  <ImDropbox style={{ color: "black", fontSize: "30px" }} />
                </p>
                <h2 style={{ color: "black" }}>{ordercount}</h2>
                <p style={{ color: "black", fontSize: "20px" }}>Orders</p>
              </div>
            </div>

            <div class="col-md-4" style={{ textAlign: "center" }}>
              <div
                class="card"
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  backgroundColor: "#d9cccc",
                }}
              >
                <p>
                  <GiAmpleDress style={{ color: "black", fontSize: "30px" }} />
                </p>
                <h2 style={{ color: "black" }}>{productcount}</h2>
                <p style={{ color: "black", fontSize: "20px" }}>Products</p>
              </div>
            </div>
          </div>
          <div>
            <h2>Line Chart</h2>
            <div className="row">
              <div className="col-md-6" style={{height:'600px'}}>
                <Line data={data} />
              </div>
              <div className="col-md-6">
              <Doughnut data={dataround} style={{width:'10px'}} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminChartPage;
