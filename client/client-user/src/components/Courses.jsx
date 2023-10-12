/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Button, Card, Typography } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import {useNavigate } from "react-router-dom";
import { Coursecard } from "./CourseCard";

import Slider from "react-slick";
import LeftArrow from "../assets/left-arrow.svg"
import RigntArrow from "../assets/right-arrow.svg"

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
              setLoading(false);
                }catch(error){
                    console.error("Error fetching courses:", error);
                    setLoading(false);
                }
              
            }
            callCoures()
                                                
    },[])

    useEffect(()=>{
           setWebdev(courses.filter((course)=>{
             return course.category=="web-devlopment" 
           }))
           console.log(webdev)
    },[])  

  
    if (loading) {
        return <div>Loading...</div>;
      }
 
    const slickArrowLeft = ({currentSlide,slideCount,...props}) =>(
       <img src={LeftArrow} alt="prevArrow"{...props}/>
    )


    const slickArrowRight = ({currentSlide,slideCount,...props}) =>(
      <img src={RigntArrow} alt="nextArrow"{...props}/>
   )


      const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide:0,
        prevArrow:<slickArrowLeft/>,
        nextArrow:<slickArrowRight/>
      };


      return <>
      
    
          <div>         
          <Slider {...settings} className="card__container--inner">
                {
                  
                  courses.map((course)=>{
                     return <>
                      <Coursecard course={course}></Coursecard>
                  </>
                  })
                
                }
                </Slider>
            
          </div>
      
      </>           
        }





        





export default Courses