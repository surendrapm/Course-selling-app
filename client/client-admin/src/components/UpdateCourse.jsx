import {Card,Grid,Typography} from "@mui/material" ;
import GrayTopper from "./GreyTopper"
import CourseCard from "./CourseCard";
import CourseInputForm from "./CourseInputForm";
import { useState } from "react";

export const UpdateCourses = ({course,setCourses})=>{
        console.log('hloo updatrecourse')
        // const [title,setTitle] = useState(course.title)
        // const [Description, setDescription] = useState(course.Description)
        // const [imageLink,setimageLink] = useState(course.imageLink)
        // const [price,Setprice] = useState(course.price) 
        // const [category,setCategory] = useState(course.category)
        // const updateInputs = {
        //         title,setTitle,
        //         Description,setDescription,
        //         imageLink,setimageLink,
        //         price,Setprice,
        //         category,setCategory
        // }

     
        return <>
     
        <GrayTopper></GrayTopper>
        <Grid item lg={8} md={12} sm={12}>

              {/* <CourseCard></CourseCard> */}
              <div style={{display:"flex", justifyContent:"center"}}>
                <Card variant="outlined" style={{maxWidth:600,marginTop:200}}>
                        <div style={{padding:20}}>
                        <Typography style={{marginBottom:10}}>Update Course</Typography>
                        {/* <CourseInputForm 
                         course={course}
                         setCourses={setCourses}
                         inputProps={updateInputs}
                        ></CourseInputForm> */}
                        </div>
                </Card>

        </div>

        </Grid>
  





        </>
}