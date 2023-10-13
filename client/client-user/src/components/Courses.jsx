/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Button, Card, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom";
import { Coursecard } from "./CourseCard";
import Slider from "react-slick";
import {SampleNextArrow,SamplePrevArrow}from "./Arrows"
     

function Courses(){
 
     const [courses , setCourses] = useState([])
     const [loading, setLoading] = useState(true);
     const [webdev,setWebdev] = useState([])
     const [android,setandroid] = useState([])
     const [aiml,setAiml] = useState([])
     const [datascience,setDatascience] = useState([])
     const [web3,setWeb3] = useState([])
     const [gamedev,setGamedev] = useState([])
    
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

              const webdevCourses = data.courses.filter((course)=>{
                return course.category=="web-devlopment" 
              })

              const AImlCourses = data.courses.filter((course)=>{
                return course.category=="ai-ml" 
              })
           
              setWebdev(webdevCourses)
              setAiml(AImlCourses)
              console.log(webdev)
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
 
   
   
      const settings = {
        className: "center",
        infinite: false,
        centerPadding: "60px",
        slidesToShow: 5,
        swipeToSlide: true,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />
        
      };

  
  
   return (
       <div>  
        
            <Typography>T</Typography>       
          <Slider {...settings}>
            
                {
                  
                  courses.map((course)=>{
                     return (
                     <div className="card_container--inner--card">
                        <Coursecard course={course}></Coursecard>
                      </div>
                     )
                    
                  })}
                       
                      
                </Slider>

                <div>
                     <DisplayWebdev category={webdev}settings={settings}/>
                     </div>
                     <div>
                      <DisplayAIml category={aiml} settings={settings} />
                     </div>
          </div>
          
      
      )         
       }

function DisplayWebdev({category,settings}){
  console.log(category)
 return( 
            <div>
                <Slider {...settings}>
            
            {
              
              category.map((course)=>{
                 return (
                 <div>
                    <Coursecard course={course}></Coursecard>
                  </div>
                 )
                
              })}
                   
                  
            </Slider>
            </div>
    
 )
}


function DisplayAIml({category,settings}){
  console.log(category)
 return( 
            <div>
                <Slider {...settings}>
            
            {
              
              category.map((course)=>{
                 return (
                 <div>
                    <Coursecard course={course}></Coursecard>
                  </div>
                 )
                
              })}
                   
                  
            </Slider>
            </div>
    
 )
}







        





export default Courses