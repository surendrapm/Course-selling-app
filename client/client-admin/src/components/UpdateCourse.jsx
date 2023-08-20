import {Card,Grid,Typography} from "@mui/material" ;
import CourseCard from "./CourseCard";
import { useEffect, useState } from "react";
import Createcourse from "./Createcourse";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Loading } from "./Loading";
import GrayTopper from "./GreyTopper"

export const UpdateCourses = ()=>{
            const {courseId} = useParams()
            const [course,setCourse] = useState([])
            const [loading,setLoading] = useState(true)
            useEffect(()=>{
                  
              // fetch(`http://localhost:3000/admin/courses/${courseId}`,{
              //   headers:{
              //     Authorization:"Bearer " + localStorage.getItem("token")
              //  }
              // }).then((res)=>{
              //     res.json().then((data)=>{
              //            setCourse(data.course)
              //            console.log(data)
              //            console.log(course)
              //     })
              // })

                async function getUpdateCourse(){
                    const res = await axios.get(`http://localhost:3000/admin/courses/${courseId}`,{
                      headers:{
                         Authorization:"Bearer " + localStorage.getItem("token")
                      }
                    })

                    const data = res.data
                    console.log(data)
                   setCourse(data.course)
                    console.log(course)
                    setLoading(false)
                   
                 

                }
                        getUpdateCourse()
                      
            },[])
      
      
           if(loading){
             return <Loading></Loading>
           }
                    

           return<>
           
                  <GrayTopper title={course.title} />
                  <Grid container>
                  <Grid item lg={8} md={12} sm={12}>
                  <Createcourse course={course} IsUpdate={true}></Createcourse>
                  </Grid>
                  <Grid item lg={4} md={12} sm={12}>
                    <CourseCard course={course} IsUpdate={true}></CourseCard>
                    </Grid>
                 </Grid>
  
         </>
}