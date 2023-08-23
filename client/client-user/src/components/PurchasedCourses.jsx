import { useEffect, useState } from "react"
import axios from 'axios'
import { Typography } from "@mui/material"

export const PurcahsedCourses = ()=>{
    const [purschasedCourse,setPurcahsed] = useState([])
          console.log("Purchased curse")
useEffect(()=>{
   async function purchasedCourse(){
 
    const res =await axios.get("http://localhost:3000/user/purchasedCourses",{
       headers:{
          "Authorization": 'Bearer ' + localStorage.getItem("token")
       }
    })
        const data = res.data
       console.log(data.purchasedCourses)
        setPurcahsed(data.courses)
    }
           purchasedCourse()
},[])



    return <>
           <Typography>hi this is surendra</Typography>
    </>
}