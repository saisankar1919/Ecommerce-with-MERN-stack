import React from 'react'
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBTooltip, MDBCardFooter, MDBBtn, MDBIcon} from "mdbreact";
import './ECommercePage.css'

const ECommercePage = () => {
  return (
    <div class="card__container">
        	<div class="card__top__section">
        		<img src="https://raw.githubusercontent.com/TshepoMooka/html-css-and-js/master/shirt-product-card/assets/images/shirt.png"/>
        		<div class="card__top__section__icons">
        			<div>
        				<i class="far fa-heart"></i>
        			</div>
        			<div>
        				<i class="fas fa-shopping-basket"></i>
        			</div>
        			<div>
        				<i class="fas fa-share-alt"></i>
        			</div>
        		</div>
        	</div>
        	<div class="card__body__section">
        		<p>A BLUE SHIRT</p>
        		<span>A nice blue shirt for men. One size fit all.</span>
        	</div>
        	<div>
        	<div class="rating-section">
            <div class="stars-rating">
             <i class="fas fa-star rating-with-color"></i>
             <i class="fas fa-star rating-with-color"></i>
             <i class="fas fa-star rating-with-color"></i>
             <i class="fas fa-star-half-alt rating-with-color"></i>
             <i class="far fa-star rating-with-color"></i>
             <span>3.6 out of 5</span>
           </div>
           <div class="c-price">
             <span>R 720. 99</span>
           </div>
            </div>
        	</div>
        </div>
  );
}

export default ECommercePage;