import React from "react";
import { Link } from "react-router-dom";

const UserNav = () => (
  <nav style={{color:'black'}}>
    <ul className="nav flex-column">
      <li className="nav-item">
        <Link style={{color:'black'}} to="/user/history" className="nav-link">
          History
        </Link>
      </li>

      <li className="nav-item">
        <Link style={{color:'black'}} to="/user/profile" className="nav-link">
          Profile Details
        </Link>
      </li>

      <li className="nav-item">
        <Link style={{color:'black'}} to="/user/password" className="nav-link">
          Change Password
        </Link>
      </li>

      <li className="nav-item">
        <Link style={{color:'black'}} to="/user/wishlist" className="nav-link">
          Wishlist
        </Link>
      </li>


    </ul>
  </nav>
);

export default UserNav;
