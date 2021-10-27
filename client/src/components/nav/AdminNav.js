import React from "react";
import { Link } from "react-router-dom";
import './AdminNav.css';

const AdminNav = () => (
  <nav style={{backgroundColor:'rgb(116 129 138)'}}>
    <ul className="nav flex-column">
      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'black'}} to="/admin/dashboard" className="nav-link">
          Dashboard
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'black'}} to="/admin/product" className="nav-link">
          Product
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'black'}} to="/admin/products" className="nav-link">
          Products
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'black'}} to="/admin/category" className="nav-link">
          Category
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'black'}} to="/admin/sub" className="nav-link">
          Sub Category
        </Link>
      </li>

      <li className="nav-item" style={{padding:'5px'}}>
        <Link style={{color:'black'}} to="/admin/coupon" className="nav-link">
          Coupon
        </Link>
      </li>

      {/* <li className="nav-item">
        <Link style={{color:'black'}} to="/user/password" className="nav-link">
          Password
        </Link>
      </li> */}
    </ul>
  </nav>
);

export default AdminNav;
