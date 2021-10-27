import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Home = () => {
  return (
    <>
      {/* <div className="jumbotron text-danger h1 font-weight-bold text-center"> */}
        {/* <Jumbotron text={["Latest Products", "New Arrivals", "Best Sellers"]} /> */}
        
        
      {/* </div> */}
    {/* <img style={{maxWidth:'100%'}} src="banner2.jpg" alt="" /> */}
    <div id="myCarousel" class="carousel slide" data-ride="carousel">
  
  <ol class="carousel-indicators">
    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
    <li data-target="#myCarousel" data-slide-to="1"></li>
    <li data-target="#myCarousel" data-slide-to="2"></li>
  </ol>

  
  <div class="carousel-inner">
    <div class="item active">
      <img src="banner.jpg" alt=""/>
    </div>

    <div class="item">
      <img src="banner2.jpg" alt=""/>
    </div>

    <div class="item">
      <img src="banner.jpg" alt=""/>
    </div>
  </div>

  
  <a class="left carousel-control" href="#myCarousel" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#myCarousel" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

      {/* <h4 style={{backgroundColor:'rgb(116 129 138)'}} className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4> */}
      <CategoryList />
      
      
      
      <h4 style={{backgroundColor:'rgb(116 129 138)'}} className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Products
      </h4>
      <NewArrivals />

      {/* <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers /> */}

      
{/* 
      <h4 style={{backgroundColor:'rgb(116 129 138)'}} className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList /> */}

      <br />
      <br />
    </>
  );
};

export default Home;
