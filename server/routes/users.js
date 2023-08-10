
const express = require('express');
const {authenticateJwt,SECRET} = require('../middleware/auth')
const jwt = require('jsonwebtoken');
const {User,Course,Admin} = require('../db/index')
const mongoose = require('mongoose')
const router = express.Router();
const stripe = require('stripe')("pk_test_51NdWCsSJpQyQP6VD1RRxLA4EzQMyQZFf9qeBQVJ2KsGox6E7KwzZGFevEFo1dqexFHlGCWy3flw4Pe2KRAlhoIxK00JUw4aG8P")
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
    const { username, password } = req.headers;
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
    const course = await Course.findById(req.params.courseId);
    
    if (course) {
      const user = await User.findOne({username: req.user.username});
      if (user) {  
        user.purchasedCourses.push(course);
        await user.save();
        res.json({ message: 'Course purchased successfully' });
      } else {
        res.status(403).json({ message: 'User not found' });
      }
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
  
  router.get('/purchasedCourses', authenticateJwt, async(req, res) => {
    const user = await User.findOne({username:req.user.username}).populate('purchasedCourses')
    if (user) {
      res.json({ purchasedCourses: user.purchasedCourses || [] });
    } else {
      res.status(403).json({ message: 'User not found' });
    }
  });


  module.exports = router