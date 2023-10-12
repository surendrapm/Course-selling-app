import { Button, Typography , Card } from "@mui/material";
import {useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"


export const Coursecard = ({course,isPurcahsed})=>{

console.log(isPurcahsed)
    const navigate = useNavigate();
 

    return <Card style={{
      
        margin:10,
        width:320,
        minHeight:200,
        padding:20
    }}>

          <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
          <img src={course.imageLink} style={{width:310 ,height:200}}  />
          <Typography textAlign={"center"} variant="subtitle1">{course.Description}</Typography>
  
         <div style={{display:"flex" ,justifyContent:"center",marginTop:20}}>
         {isPurcahsed?<Button size = {'large'} variant="contained">Go to class</Button> :
         (
           <><Button size = {'large'} variant="contained"
           onClick={()=>{
            console.log(course._id)
           navigate("/buycourse/" + course._id);
           }}
       >Checkout</Button>
        <Button size = {'large'}
         variant="outlined" style={{marginLeft:30}}
  
        
         >Descrpition</Button>
         </>
         )}
         </div>
        


    </Card> 
}