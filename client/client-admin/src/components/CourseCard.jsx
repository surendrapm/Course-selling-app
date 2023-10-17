import { Button, Card, Typography } from "@mui/material"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
function CourseCard({course,IsUpdate}){
       const navigate = useNavigate()
       
    return <div style={{display:"flex",marginTop:50,justifyContent: 'center',width:"100%"}}>
        <Card style={{
      
      margin:10,
      width:350, 
      minHeight:200,
      borderRadius:20,
      marginRight:50,
      paddingBottom:15,
      zIndex:2
  }}>
      <img src={course.imageLink} style={{width:350}} />
      <div style={{marginLeft:10}}>
          <Typography textAlign={"center"} variant="h4">{course.title}</Typography>
          <Typography variant="subtitle2" style={{color:"grey"}}>Price</Typography>
          <Typography variant="subtitle1" >
            ${course.price} 
            </Typography>
            <div style={{display:"flex" ,justifyContent:"space-around"}}>
            {
            IsUpdate? <Button size = {'large'} variant="contained"
              onClick={()=>{
                handleDelete
              }}
            >delete</Button>:
            <Button size = {'large'} variant="contained"
            onClick={()=>{
             console.log(course._id)
           
            navigate("/updatecourse/" + course._id);
            }}
         >Update</Button>
             }
    
           
        
            </div>
           
      </div>
   </Card>
  </div>
}


export default CourseCard