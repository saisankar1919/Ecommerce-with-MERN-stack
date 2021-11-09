const Offer = require("../models/offer");
const Product =  require('../models/product');

// create, remove, list

exports.create = async (req, res) => {
  let arrlength
  try {
    // console.log(req.body);
    // return;
    
    const { name, category, expiry, discount } = req.body.offer;
    
    await Offer.find({'category':category}).then((res)=>{
      arrlength = res.length
      console.log('...........',arrlength)
    })
    console.log('......++++++.....',arrlength)
    if(arrlength == 0)
    {
      let newPrice = 100
    res.json(await new Offer({ name, category, expiry, discount }).save().then(async()=>{
        const products = Product.find({'category':category}).then((res)=>{
            console.log('+++++++++++++',res)
            res.forEach(async(i)=>{
                // let proprice = i.price
                console.log(i.price);
                i.offerPrice = i.price - discount/100*i.price
                console.log(i.offerPrice);
                const update =  await Product.updateMany({'_id':i._id}, {$set:{"offerPrice":i.price }})
                const updateoffer =  await Product.updateMany({'_id':i._id}, {$set:{"price":i.offerPrice }})     
            })
        })
        
    }));
    }else{
      res.status(401).json({message:'offer already exist the category'})
    }
    
    
  } catch (err) {
    console.log(err);
  }
};

exports.remove = async (req, res) => {
  Offer.find({_id:req.params.offerId}).exec().then((res)=>{
    let offer = res[0];
    console.log(offer)
    const products = Product.find({'category':offer.category}).then((res)=>{
      console.log('+++++++++++++',res)
      res.forEach(async(i)=>{
          // let proprice = i.price
          let offerPrice = i.price;
          let price = i.offerPrice;
          // console.log(i.price);
          // i.offerPrice = i.price - discount/100*i.price
          // console.log(i.offerPrice);
          const update =  await Product.updateMany({'_id':i._id}, {$set:{'offerPrice':false}})
          const updateoffer =  await Product.updateMany({'_id':i._id}, {$set:{"price":price }})     
      })
  })
  })
  try {
    res.json(await Offer.findByIdAndDelete(req.params.offerId).exec().then((res)=>{
        console.log(res)
    }));
  } catch (err) {
    console.log(err);
  }
};

exports.list = async (req, res) => {
  try {
    res.json(await Offer.find({}).sort({ createdAt: -1 }).exec());
  } catch (err) {
    console.log(err);
  }
};
