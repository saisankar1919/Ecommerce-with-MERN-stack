const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    images: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    phone: {
      type: Number,
     
    },
    cart: {
      type: Array,
      default: [],
    },
    housename: {
      type:String,
      
    },
    city:{
      type:String
    },
    zip:{
      type:String
    },
    district:{
      type:String
    },
    state:{
      type:String
    },
    country:{
      type:String
    },
    wishlist: [{ type: ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
