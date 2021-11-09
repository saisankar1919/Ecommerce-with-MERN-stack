const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const addressSchema = new mongoose.Schema(
  {
    user: { type: ObjectId, ref: "User" },
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
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Address", addressSchema);
