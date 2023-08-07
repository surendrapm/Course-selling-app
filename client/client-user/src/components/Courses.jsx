/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Button, Card, Typography } from "@mui/material"
import axios from "axios"

import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom";



function Courses(){
 
     const [courses , setCourses] = useState([])
     const [loading, setLoading] = useState(true);
    
    useEffect(()=>{
      
           async function callCoures(){
              
                try{
                    const response =await axios.get("http://localhost:3000/admin/courses",{
                     
                    headers:{ 
                        "Authorization":'Bearer ' + localStorage.getItem("token")
                 }
                 
              })
              let data = response.data
              console.log(data)
              setCourses(data.courses)
              setLoading(false);
                }catch(error){
                    console.error("Error fetching courses:", error);
                    setLoading(false);
                }
              
            }
            callCoures()
                                                
    },[])

    if (loading) {
        return <div>Loading...</div>;
      }
      return <div style= {{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
                   
             
              {courses.map(course => {
          return  <Course course={course}/>}
            )}
      </div> 
            
            }




 export function Course({course}){
       
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
         <Button size = {'large'} variant="contained"
           onClick={()=>{
            console.log(course._id)
           navigate("/courses/" + course._id);
           }}
        >Buy</Button> 
        <Button size = {'large'}
         variant="outlined" style={{marginLeft:30}}
         onClick={async()=>{
           const res = await axios.delete('http://localhost:3000/admin/courses/'+ course._id,{
            headers:{ 
                "Authorization":'Bearer ' + localStorage.getItem("token")
            }
           })
            const data = res.data
            console.log(data)
            alert(data.title,'Course deleted  successfully')
         }}
         >delete</Button>
         </div>
        
        

    </Card>
}



export default Courses