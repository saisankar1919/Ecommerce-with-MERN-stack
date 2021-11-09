import React from "react";
import { Link } from "react-router-dom";
import './AdminNav.css';
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const AdminNav = () =>{ 

  let dispatch = useDispatch();
  let history = useHistory();


  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };
  
  return(
  <nav style={{backgroundColor:'rgb(87, 67, 67)',height:'100vh',boxShadow: "5px 5px 8px 5px #555"}}>
    <ul className="nav flex-column">

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/chart" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/dashboard" className="nav-link">
          Order Management
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/report" className="nav-link">
          Sales Report
        </Link>
      </li>

      {/* <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/product" className="nav-link">
          Add Product
        </Link>
      </li> */}

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/products" className="nav-link">
          Product Management
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/category" className="nav-link">
          Category Management
        </Link>
      </li>

      {/* <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/sub" className="nav-link">
          Sub Category
        </Link>
      </li> */}

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'white'}} to="/admin/offer" className="nav-link">
          Offer
        </Link>
      </li>
      
      {/* <li className="nav-item" style={{padding:'5px'}}>
        <div style={{color:'white',cursor:'pointer'}} onClick={logout} className="nav-link">
          Signout
        </div>
      </li> */}

      {/* <li className="nav-item">
        <Link style={{color:'black'}} to="/user/password" className="nav-link">
          Password
        </Link>
      </li> */}
    </ul>
  </nav>

  
);}

export default AdminNav;
