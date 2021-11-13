const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const Order = require("../models/order");
const Address = require("../models/address")
const uniqueid = require("uniqueid");
const address = require("../models/address");

exports.userCart = async (req, res) => {
  // console.log(req.body); // {cart: []}
  const { cart } = req.body;

  let products = [];

  const user = await User.findOne({ email: req.user.email }).exec();

  // check if cart with logged in user id already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    // get price for creating total
    let productFromDb = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    object.price = productFromDb.price;

    products.push(object);
  }

  // console.log('products', products)

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  // console.log("cartTotal", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderdBy: user._id,
  }).save();

  console.log("new cart ----> ", newCart);
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  console.log("empty cart");
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

// exports.saveAddress = async (req, res) => {
//   const userAddress = await User.findOneAndUpdate(
//     { email: req.user.email },
//     { address: req.body.address }dsc
//   ).exec();

//   res.json({ ok: true });
// };

exports.saveAddress = async (req, res) => {
  try {
    console.log(req.body);
    // req.body.slug = slugify(req.body.title);
    const newAddress = await new User(req.body).save();
    res.json(newAddress);
  } catch (err) {
    console.log(err);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      err: err.message,
    });
  }
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;
  console.log("COUPON", coupon);

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid coupon",
    });
  }
  console.log("VALID COUPON", validCoupon);

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  console.log("cartTotal", cartTotal, "discount%", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2); // 99.99

  console.log("----------> ", totalAfterDiscount);

  Cart.findOneAndUpdate(
    { orderdBy: user._id },
    { totalAfterDiscount },
    { new: true }
  ).exec();

  res.json(totalAfterDiscount);
};

exports.createAddress = async(req,res)=>{
  console.log("lflglr",req.user)
  const user = await User.findOne({email:req.user.email}).exec();
  console.log(user)
  const {housename,city,zip,district,state,country} = req.body.address
  let newAddress = await Address({
    user:user._id,
    housename:housename,
    city:city,
    zip:zip,
    district:district,
    state:state,
    country:country,
  }).save().then(()=>{
  console.log('newAddress saved');
  res.json({ ok: true });
})
}

exports.getAddress = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let address = await Address.find({ user: user._id })
    // .populate("products.product", "_id title price totalAfterDiscount")
    .exec()
    console.log(address)
    // const { housename, city, zip, district, state, country } = address;
    // console.log(housename)
    res.json({ address });

};

exports.deleteAddress = async (req,res)=>{
  const { addressId } = req.params;
  const user = await User.findOne({email:req.user.email}).exec();

  let address = await Address.findOneAndRemove({_id:addressId}).exec()
  res.json(address);
}

// exports.getAddress = async(req,res)=>{
//   console.log('here')
//   console.log(req.user)
//   const user = await User.findOne({ email: req.user.email }).exec();
//   const address = await Address.find({user:user._id}).exec().then((res)=>{
//     res.json({address})
//   })
// }

exports.createOrder = async (req, res) => {
  // console.log(req.body);
  console.log(req.body.stripeResponse)
  
  // const { paymentIntent } = req.body.stripeResponse;
  const paymentIntent = req.body.stripeResponse
  console.log('**************',paymentIntent)
  

  const user = await User.findOne({ email: req.user.email }).exec();
  console.log(user)

  let { products } = await Cart.findOne({ orderdBy: user._id }).exec();
  console.log(products)

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

  // decrement quantity, increment sold
  let bulkOption = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};

exports.orders = async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).exec();

  let userOrders = await Order.find({ orderdBy: user._id })
    .populate("products.product")
    .exec();

  res.json(userOrders);
};

// addToWishlist wishlist removeFromWishlist
exports.addToWishlist = async (req, res) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.wishlist = async (req, res) => {
  const list = await User.findOne({ email: req.user.email })
    .select("wishlist")
    .populate("wishlist")
    .exec();

  res.json(list);
};

exports.removeFromWishlist = async (req, res) => {
  const { productId } = req.params;
  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $pull: { wishlist: productId } }
  ).exec();

  res.json({ ok: true });
};

exports.getUser = async(req,res) =>{
  console.log(req.user)
  const user = await User.findOne({email: req.user.email}).exec()
  res.json({user})
}

exports.updateName = async(req,res) =>{
  console.log('here')
  const {name} = req.body
  console.log(name)

  const user = await User.findOneAndUpdate({email:req.user.email},{name:name})

}

exports.updateProfileImage = async(req,res)=>{
  console.log('upload image in user database')
  const {url} = req.body
  const user = await User.findOneAndUpdate({email:req.user.email},{$set:{images:url}}).exec().then((res)=>console.log(res))
  .catch((err)=>console.log(err))
}

exports.updateMobile = async(req,res) =>{
  const {mobile} = req.body
  const user = await User.findOneAndUpdate({email:req.user.email},{$set:{phone:mobile}}).exec()
}

exports.userBlock = async(req,res) =>{
  const {id} = req.body
  console.log('here')
  const user = await User.findOneAndUpdate({_id:id},{status:false}).exec()
  res.json(user)
}

exports.userUnblock = async(req,res) =>{
  const {id} = req.body
  const user = await User.findOneAndUpdate({_id:id},{status:true}).exec()
  res.json(user)
}


exports.getUsers = async(req,res) => {
  const users = await User.find({}).exec()
    res.json(users)
  }



exports.createCashOrder = async (req, res) => {
  const { COD, couponApplied } = req.body;
  // if COD is true, create order with status of Cash On Delivery

  if (!COD) return res.status(400).send("Create cash order failed");

  const user = await User.findOne({ email: req.user.email }).exec();

  let userCart = await Cart.findOne({ orderdBy: user._id }).exec();

  let finalAmount = 0;

  if (couponApplied && userCart.totalAfterDiscount) {
    finalAmount = userCart.totalAfterDiscount * 100;
  } else {
    finalAmount = userCart.cartTotal * 100;
  }

  let newOrder = await new Order({
    products: userCart.products,
    paymentIntent: {
      id: uniqueid(),
      amount: finalAmount,
      currency: "usd",
      status: "Cash On Delivery",
      created: Date.now(),
      payment_method_types: ["cash"],
    },
    orderdBy: user._id,
    orderStatus: "Cash On Delivery",
  }).save();

  // decrement quantity, increment sold
  let bulkOption = userCart.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item.product._id }, // IMPORTANT item.product
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });

  let updated = await Product.bulkWrite(bulkOption, {});
  console.log("PRODUCT QUANTITY-- AND SOLD++", updated);

  console.log("NEW ORDER SAVED", newOrder);
  res.json({ ok: true });
};


