import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import laptop from "../../images/laptop.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { MdShoppingCart } from "react-icons/md";
import { AiFillEye } from "react-icons/ai";
import "./ProductCard.css";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const [tooltip, setTooltip] = useState("Click to add");

  // redux
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };

  // destructure
  const { images, title, description, slug, price } = product;
  return (
    <div>
      <Card className="cardHover" style={{ boxShadow: "5px 5px 8px 5px #555" }}
        cover={
          <img
            src={images && images.length ? images[0].url : laptop}
            style={{ height: "400px", objectFit: "cover",boxShadow: "5px 5px 8px 5px #555" }}
            className=""
          />
        }
        actions={[
          <Link style={{ color: "", fontSize: "30px" }} to={`/product/${slug}`}>
            <AiFillEye style={{ color: "rgb(87, 67, 67)" }} />
          </Link>,
         
            <div
              style={{ color: "", fontSize: "30px" }}
              onClick={handleAddToCart}
              disabled={product.quantity < 1}
            >
              {product.quantity < 1 ? (
                "Out of stock"
              ) : (
                <MdShoppingCart style={{ color: "rgb(87, 67, 67)" }} />
              )}
            </div>,
        ]}
      >
       {product && product.ratings && product.ratings.length > 0 ? (
          showAverage(product)
        ) : (
          <div className="pt-1 pb-3">No rating yet</div>
        )}
        <Meta
          title={`${title} - $${price}`}
          // description={`${description && description.substring(0, 30)}...`}
           
        />
        
      </Card>
    </div>
  );
};

export default ProductCard;
