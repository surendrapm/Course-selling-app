
const express = require('express');
const {authenticateJwt,SECRET} = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const User = require('../db/user')
const  Course = require('../db/courses')
const Subscription = require('../db/subscriptions')
const mongoose = require('mongoose');
const router = express.Router();
const Razorpay = require('razorpay')
const crypto = require('crypto');
const { default: subscriptions } = require('razorpay/dist/types/subscriptions');

//me route
router.get("/me",authenticateJwt,async(req,res)=>{
  const user = await User.findOne({username:req.user.username})
  if(!user){
      res.status(403).json({msg:"User doesnt exist"})
      return
  }
 
res.json({
  username: user.username
})
});


router.post('/signup',  async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username})
    if (user) {
      res.status(403).json({ message: 'User already exists' });
    } else {
      const newUser = new User({ username, password });
        await newUser.save()      
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'User created successfully', token });
    }
  });
  
  router.post('/login', async(req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username,password})
    if (user) {
      const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.get('/courses', authenticateJwt, async(req, res) => {
    const courses = await Course.find({published:true});
    res.json({ courses});
  });
  
  router.post('/courses/:courseId', authenticateJwt, async(req, res) => {
        console.log('dshj')
     try{
      const course = await Course.findById(req.params.courseId);
      const user = await User.findOne()
      if(!course){
          res.status(404).json({ message: 'Course not found' });
      }
      if(!user){
         res.status(404).json({message:'User not found'})
      }
    
      const instance = new Razorpay({
         key_id:process.env.RAZORPAY_API_KEY,
         key_secret:process.env.RAZORPAY_API_SECRET
      });
            console.log(course.price)
       const options = {
           amount:course.price*100,
           currency:"INR",
           receipt:crypto.randomBytes(10).toString('hex'),
          };
           
             instance.orders.create(options,(error,order)=>{
                if(error){
                  console.log(error);
                  return res.status(500).json({msg:"Something Went Wrong"})
                }
                 res.status(200).json({data:order})
             })
              } catch(error){
        console.log(error);
        res.status(500).json({message:"internal server Error!"})
     }
  });
  


router.post('/paymentverify/:courseId',authenticateJwt,async(req,res)=>{
          try{
                 console.log('im entered',req.body)
               const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = req.body;
               console.log('razorpay_order_id',razorpay_order_id)
               console.log('razorpay_payment_id',razorpay_payment_id)
               const sign = razorpay_order_id + "|" + razorpay_payment_id;
               const expectedSign = crypto
               .createHmac("sha256",process.env.RAZORPAY_API_SECRET)
               .update(sign.toString())
               .digest('hex');

               if(razorpay_signature === expectedSign){
                console.log('im entered222')
                       const course = await Course.findById(req.params.courseId);
                       const user = await User.findOne({username: req.user.username});
                       console.log(user)
                       user.purchasedCourses.push(course);
                       await user.save();
                       res.json({ message: 'Course purchased successfully' });
                    }else{
                       return res.status(400).json({ message: "Invalid signature sent!" });
                    }
                  }catch(err){
                    res.status(500).json({ message: "Internal Server Error!" });
                   console.log(error)
          }
})



router.get('/purchasedCourses', authenticateJwt,async(req, res) => {
  console.log("purchsed hitted")
    const user = await User.findOne({username:req.user.username}).populate('purchasedCourses')
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });



router.post('buysubscription/:userId',authenticateJwt,async(req,res)=>{
    const SubscriptionDuration = req.body.Duration;
    const Payment = req.body.price
     const startDate = new Date()
     let endDate = new Date

     if(parseInt(SubscriptionDuration) === 6){
       endDate.setMonth(endDate.getMonth() + 6)
     }else if (SubscriptionDuration === 1){
       endDate.setFullYear(endDate.getFullYear() + 1);
     }else{
         return res.status(400).json({error:'Invalid subscription type'})
     }
            //creating subscription to DB
      const newSubscription = new Subscription({
        userId,
        SubscriptionDuration,
        startDate,
        endDate,
      })
      //save subs to db
      await newSubscription.save();
      
})

  module.exports = router