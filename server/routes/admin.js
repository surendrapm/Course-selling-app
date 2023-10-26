const express = require('express');
const jwt = require('jsonwebtoken');
const {SECRET} = require("../middleware/auth")
const {authenticateJwt} = require("../middleware/auth")
const mongoose = require('mongoose')
const User = require('../db/user')
const  Admin = require('../db/admin')
const  Course = require('../db/courses')

const router = express.Router();






//me route
router.get("/me",authenticateJwt,async(req,res)=>{
    const admin = await Admin.findOne({username:req.user.username})
    if(!admin){
        res.status(403).json({msg:"Admin doesnt exist"})
        return
    }
   
  res.json({
    username: admin.username
  })
});


// Admin routes
router.post('/signup',async(req, res) => {
  const { username, password } = req.body;
 
  const admin = await Admin.findOne({username})
   if(admin){
     res.status(403).json({msg:'Admin already exists'})
   }else{
    const obj = {username:username , password:password}
    const newAdmin = new Admin(obj)
    newAdmin.save()
    const token = jwt.sign({username, role:'admin'},SECRET,{expiresIn:"1h"});
    res.json({message:'Admin created Successfully',token})
   }
});

router.post('/login',async(req, res) => {
  const { username, password } = req.body;
  const admin = await  Admin.findOne({username,password})
  if (admin) {
    const token = jwt.sign({ username, role: 'admin' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
});

router.post('/courses', authenticateJwt,async(req, res) => {
  const course = new Course(req.body)
  await course.save()
  res.json({ message: 'Course created successfully', courseId: course._id });
});

router.put('/courses/:courseId', authenticateJwt,async(req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body,{new:true})
   if(course){
    res.json({ message: 'Course updated successfully' });
   }else {
    res.status(404).json({ message: 'Course not found' });
  }
});

router.get('/courses', authenticateJwt,async(req, res) => {
      
    const courses = await Course.find({})
  res.json({ courses });
});


router.delete('/courses/:courseId', authenticateJwt,async(req, res) => {
  const course = await Course.findByIdAndDelete(req.params.courseId)
   if(course){
    res.json({ message: 'Course Deleted successfully' });
   }else {
    res.status(404).json({ message: 'Course not found' });
  }
});




router.get('/courses/:courseId',authenticateJwt,async(req,res)=>{
     const courseId = req.params.courseId
     const course = await Course.findById(courseId)
     console.log(course)
     res.json({course})
})

module.exports = router
