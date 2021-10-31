import React from "react";
import { Link } from "react-router-dom";
import { Card, Tooltip } from "antd";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Home.css";
import HomeCards from "../components/HomeCards";
import ECommercePage from "../components/ECommercePage";
import CartTemplate from "../components/CartTemplate";

const Home = () => {
  return (
    <div style={{ marginTop: "0px" }}>
      <div class="cont" style={{ boxShadow: "5px 5px 8px 5px #555" }}>
        <img src="banner5.jpg" width="100%" alt="" />
        <Link to="/shop">
          <button class="btn">Shop now </button>
        </Link>
      </div>

      {/* <h4 style={{backgroundColor:'rgb(116 129 138)'}} className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4> */}
      <CategoryList />
      <HomeCards />

      <h4
        style={{
          backgroundColor: "linear-gradient(180deg,rgb(116 129 138), white)",
        }}
        className="text-center p-3 mt-5 mb-5 display-4 jumbotron"
      >
        New Arrivals
      </h4>
      <NewArrivals />
      {/* <ECommercePage/> */}
      {/* <CartTemplate/> */}

      
      

      <br />
      <br />
    </div>
  );
};

export default Home;
