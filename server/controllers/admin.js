const Order = require("../models/order");
const User = require('../models/user')
const Product = require('../models/product');
const { startSession } = require("mongoose");
// const User = require("../models/user");

exports.orders = async (req, res) => {
  let allOrders = await Order.find({})
    .sort("-createdAt")
    .populate("products.product")
    .exec();

  res.json(allOrders);
};

exports.orderStatus = async (req, res) => {
  // console.log(req.body);
  // return;
  const { orderId, orderStatus } = req.body;

  let updated = await Order.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
  ).exec();

  res.json(updated);
};

exports.orderCount = async (req,res) =>{
  Order.find().count(function(err, count){
    console.log("Number of docs: ", count )
    res.json(count)
});
}

exports.userCount = async (req,res) =>{
  User.find().count(function(err, count){
    console.log("Number of docs: ", count )
    res.json(count)
});
}

exports.productCount = async (req,res) =>{
  Product.find().count(function(err, count){
    console.log("Number of docs: ", count )
    res.json(count)
});
}

exports.dateFilter = async (req,res) =>{


  const { start, end } = req.body;

  console.log(start)

  // var startt = new Date(start)
  // var endt = new Date(end)
  // startt.toISOString()
  // endt.toISOString()
  // console.log(startt)
  // console.log(endt)

   Order.find({createdAt:{$gte:start,$lte:end}}).then((data)=>{
    res.json({data})
   })
}

exports.orderProducts = async (req,res) =>{
  const pros = Order.aggregate([
    {
        $unwind: '$products'
    },
    {
        $project: {
            productId: '$products._Id',

        }
    },
    {
        $lookup: {
            from: 'product',
            localField: 'productId',
            foreignField: '_id',
            as: 'output'
        }
    }, {
        $project: {

            output: { $arrayElemAt: ["$output", -1] }
        }
    },
    {
        $project: {
            'output.productDetails': 1,
            _id: 0

        }
    },
    {
        $group: {
            _id: "$output.productDetails",

            TotalCount: { $sum: 1 }
        }
    }

])

console.log(pros)

}
