import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const getUsers = async(authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/getusers`, {
    headers: {
      authtoken,
    },
  });

export const blockUser = async(id) =>
  await axios.put(`${process.env.REACT_APP_API}/user/blockuser`, {
  id,
});

export const unblockUser = async(id) =>
  await axios.put(`${process.env.REACT_APP_API}/user/unblockuser`,  {
    id,
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`${process.env.REACT_APP_API}/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const saveUserAddress = async (authtoken, address) =>{
console.log(address)
  await axios.post(
    `${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );}

export const applyCoupon = async (authtoken, coupon) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cart/coupon`,
    { coupon },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createOrder = async (stripeResponse, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/order`,
    { stripeResponse },
    {
      headers: {
        authtoken,
      },
    }
  );
export const getAddress = authtoken =>  axios.get(`${process.env.REACT_APP_API}/user/getaddress`, { headers: { authtoken,}})    



  export const createAddress = async(address, authtoken) =>{
    await axios.post(`${process.env.REACT_APP_API}/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    })
  }

export const getUserOrders = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/orders`, {
    headers: {
      authtoken,
    },
  });

export const getWishlist = async (authtoken) =>
  await axios.get(`${process.env.REACT_APP_API}/user/wishlist`,{}, {
    headers: {
      authtoken,
    },
  });

  export const deleteAddress = async (addressId, authtoken)=>{
    console.log(addressId)
  await axios.put(
    `${process.env.REACT_APP_API}/user/deleteaddress`,
    {addressId},
    {
      headers: {
        authtoken,
      },
    }
  );}
  

export const removeWishlist = async (productId, authtoken) =>
  await axios.put(
    `${process.env.REACT_APP_API}/user/wishlist/${productId}`,
    {},
    {
      headers: {
        authtoken,
      },
    }
  );

export const addToWishlist = async (productId, authtoken) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/wishlist`,
    { productId },
    {
      headers: {
        authtoken,
      },
    }
  );

export const createCashOrderForUser = async (
  authtoken,
  COD,
  couponTrueOrFalse
) =>
  await axios.post(
    `${process.env.REACT_APP_API}/user/cash-order`,
    { couponApplied: couponTrueOrFalse, COD },
    {
      headers: {
        authtoken,
      },
    }
  );
