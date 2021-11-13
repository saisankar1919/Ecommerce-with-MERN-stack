import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  getUserCart,
  emptyUserCart,
  saveUserAddress,
  applyCoupon,
  getAddress,
  deleteAddress,
  createCashOrderForUser,
} from "../functions/user";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./Checkout.css";
import { createAddress } from "../functions/user";
import { MdDelete } from "react-icons/md";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  // const [gettedAddress, setGettedAddress] = useState()
  // const [address, setAddress] = useState({houseName:"",street:'',city:'',district:'',state:''});
  const [address, setAddress] = useState({
    housename: "",
    street: "",
    city: "",
    zip: "",
    district: "",
    state: "",
    country: "",
  });
  console.log(address);

  const [gettedAddress, setGettedAddress] = useState();
  console.log(gettedAddress)

  const [addressSaved, setAddressSaved] = useState(false);
  const [coupon, setCoupon] = useState("");
  // discount price
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");

  const dispatch = useDispatch();
  const { user, COD } = useSelector((state) => ({ ...state }));
  const couponTrueOrFalse = useSelector((state) => state.coupon);
  const [add, setAdd] = useState(false)
  
  
  
  useEffect(async() => {
    loadcart();
    loadAddress();
    }, []);

    const loadcart = ()=>{
       getUserCart(user.token).then(async(res) => {
      console.log("user cart res", JSON.stringify(res.data, null, 4));
      setProducts(res.data.products);
      setTotal(res.data.cartTotal);
      
      
    });
    }

    const loadAddress = async()=>{
      await getAddress(user.token).then((res)=>{ 
        setGettedAddress(res.data.address)
      })
       .catch((err)=>{console.log(err)})
    }

  // const getUserAddress = async()=>{
  //   console.log('here')
     
  // }

  const emptyCart = () => {
    // remove from local storage
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart");
    }
    // remove from redux
    dispatch({
      type: "ADD_TO_CART",
      payload: [],
    });
    // remove from backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("Cart is emapty. Contniue shopping.");
    });
  };

  // const saveAddressToDb = () => {
  //   // console.log(address);
  //   saveUserAddress(user.token, address).then((res) => {
  //     if (res.data.ok) {
  //       setAddressSaved(true);
  //       toast.success("Address saved");
  //     }
  //   });
  // };



  const saveAddressToDb = (e) => {
    e.preventDefault();
    if (address.housename==''||address.city==''||address.zip==''||address.district==''||address.state==''||
    address.country=='') {
      toast.error("Provide the required fields");
    } else {
      
      createAddress(address, user.token)
        .then((res) => {
          console.log(res);
          setAddressSaved(true);
          toast.success("Address saved");
          // window.location.reload();
          setAdd(false)
          loadAddress();
          history.push("/checkout");
         
        })
        .catch((err) => {
          console.log(err);
          // if (err.response.status === 400) toast.error(err.response.data);
          toast.error(err.response.data.err);
        });
    }
  };

  const applyDiscountCoupon = () => {
    console.log("send coupon to backend", coupon);
    applyCoupon(user.token, coupon).then((res) => {
      console.log("RES ON COUPON APPLIED", res.data);
      if (res.data) {
        setTotalAfterDiscount(res.data);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: true,
        });
      }
      // error
      if (res.data.err) {
        setDiscountError(res.data.err);
        // update redux coupon applied true/false
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
      }
    });
  };

  const handleChange = (evt) => {
    const value = evt.target.value;
    setAddress({
      ...address,
      [evt.target.name]: value,
    });
  };

  const deleteAddressHandler = (addressId)=>{
    deleteAddress(addressId, user.token).then((res)=>
    {
      loadAddress();
      toast.error('address deleted')})
  }

  const close =()=>{
    setAdd(false)
  }

 const addHandler = ()=>{
   setAdd(true)
 }

 const onValueChange = ()=>{
  setAddressSaved(true)
 }

  const showAddress = () => (
    <>
    {add &&(<form action="" onSubmit={saveAddressToDb}>
      <div>
        <button onClick={close} className='btn btn-primary' style={{float:'right', color:'black'}}>X</button>
      </div>
        <div class="form-group">
          <input
            value={address.housename}
            name="housename"
            onChange={handleChange}
            maxlength="20" oninput="this.value=this.value.replace(/[^A-Za-z-,.;'&/.() ]|^ /g,'')"
            type="houseName"
            class="form-control"
            id="autocomplete"
            placeholder="House Name"
            width="50px"
          />

          <input
            value={address.city}
            maxlength="20" oninput="this.value=this.value.replace(/[^A-Za-z-,.;'&/.() ]|^ /g,'')"
            name="city"
            onChange={handleChange}
            type="city"
            class="form-control"
            id="inputCity"
            placeholder="City"
          />

          <input
            value={address.zip}
            pattern="[0-9]*"
            maxLength="6"
            oninput="this.value=this.value.replace(/[^\d]/,'')"
            name="zip"
            type="zip"
            class="form-control"
            onChange={handleChange}
            id="inputZip"
            placeholder="Zip"
            style={{ marginLeft: "10px" }}
          />
          <input
            value={address.state}
            maxlength="20" oninput="this.value=this.value.replace(/[^A-Za-z-,.;'&/.() ]|^ /g,'')"
            name="state"
            type="state"
            class="form-control"
            onChange={handleChange}
            id="inputState"
            placeholder="State"
            style={{ marginLeft: "10px" }}
          />

          <input
            value={address.district}
            maxlength="20" oninput="this.value=this.value.replace(/[^A-Za-z-,.;'&/.() ]|^ /g,'')"
            name="district"
            type="district"
            class="form-control"
            onChange={handleChange}
            id="inputCounty"
            placeholder="District"
          />

          <input
            value={address.country}
            maxlength="20" oninput="this.value=this.value.replace(/[^A-Za-z-,.;'&/.() ]|^ /g,'')"
            name="country"
            type="country"
            class="form-control"
            onChange={handleChange}
            id="inputCountry"
            placeholder="Country"
            style={{ marginLeft: "10px" }}
          />
        </div>
        <div style={{float:'right'}}>
          <br />
          <br />
         <button className="btn btn-primary mt-2 float-right"style={{color:'rgb(87 67 67)'}} type="submit">
          Save
        </button> 
        </div>
        
      </form>)}
        <div>
       { gettedAddress?.map((a)=>
       <div>
      <input type="radio" value={a._id} name={a._id} onChange={onValueChange}/> 
       <p>{a.housename},{a.city},{a.zip},{a.district},
       {a.state},{a.country} 
       <MdDelete onClick={()=>deleteAddressHandler(a._id)} style={{float:"right",color:'red',cursor:'pointer'}}/></p>
       </div>
       
       ) }
       {gettedAddress?.length<4 && (<div><button className='btn btn-outlined-primary' onClick={addHandler} style={{float:'right'}}>Add address</button></div>)}
        
      </div>
      
    </>
  );

  const showProductSummary = () =>
    products.map((p, i) => (
      <div key={i}>
        <p>
          {p.product.title} ({p.color}) x {p.count} ={" "}
          {p.product.price * p.count}
        </p>
      </div>
    ));

  const showApplyCoupon = () => (
    <>
      <input
        onChange={(e) => {
          setCoupon(e.target.value);
          setDiscountError("");
        }}
        value={coupon}
        type="text"
        className="form-control"
      />
      <div style={{float:'right'}}>
        <button
        onClick={applyDiscountCoupon}
        className="btn btn-primary mt-2 float-right"
        style={{color:'rgb(87 67 67)'}}
      >
        Apply
      </button> 
      </div>
     
    </>
  );

  const createCashOrder = () => {
    createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
      console.log("USER CASH ORDER CREATED RES ", res);
      // empty cart form redux, local Storage, reset coupon, reset COD, redirect
      if (res.data.ok) {
        // empty local storage
        if (typeof window !== "undefined") localStorage.removeItem("cart");
        // empty redux cart
        dispatch({
          type: "ADD_TO_CART",
          payload: [],
        });
        // empty redux coupon
        dispatch({
          type: "COUPON_APPLIED",
          payload: false,
        });
        // empty redux COD
        dispatch({
          type: "COD",
          payload: false,
        });
        // mepty cart from backend
        emptyUserCart(user.token);
        // redirect
        setTimeout(() => {
          history.push("/user/history");
        }, 1000);
      }
    });
  };

  return (
    <div
      className="row"
      // style={{ margin: "20px" }}
      
      style={{ marginTop: "78px", marginLeft: "40px", marginRight: "40px" }}
    >
      <div className="col-md-6" >
        <div className='card' style={{marginTop:'20px',padding:'20px',backgroundColor:'#d9cccc'}}>
          <h4>Delivery Address</h4>
        {/* <br />
        <br /> */}
        {showAddress()}
        <br />
        <br />
        <br />
        <br />
        <div style={{ marginTop: "50px" }}>
          <h4>ApplyCoupon</h4>
        </div>
        <br />
        {showApplyCoupon()}
        <br />
        {discountError && <p className="bg-danger p-2">{discountError}</p>}
        </div>
        
      </div>

      <div className="col-md-6">
        <div className='card' style={{marginTop:'20px',padding:'20px', backgroundColor:'#dfdbdb'}}>
          <h4>Order Summary</h4>
        <hr />
        <p>Products {products.length}</p>
        <hr />
        {showProductSummary()}
        <hr />
        <p>Cart Total: {total}</p>

        {totalAfterDiscount > 0 && (
          <p className="bg-success p-2">
            Discount Applied: Total Payable: ${totalAfterDiscount}
          </p>
        )}

        <div className="row">
          <div className="col-md-6">
            {COD ? (
              <button
                className="btn btn-primary"
                hidden={!addressSaved || !products.length}
                onClick={createCashOrder}
                style={{color:'rgb(87 67 67)'}}
              >
                Place Order
              </button>
            ) : (
              <button
                className="btn btn-primary"
                style={{color:'rgb(87 67 67)'}}
                disabled={!addressSaved || !products.length}
                onClick={() => history.push({
                  pathname: '/payment',
                  // search: '?query=abc',
                  state: { total: total }
                  
              })}
              >
                Place Order
              </button>
            )}
          </div>

          {/* <div className="col-md-6">
            <button
              disabled={!products.length}
              onClick={emptyCart}
              className="btn btn-primary"
            >
              Empty Cart
            </button>
          </div> */}
        </div>
      </div>
        </div>
        
    </div>
  );
};

export default Checkout;
