import { useEffect, useState } from "react"
import axios from 'axios'
import { Typography } from "@mui/material"
import { Coursecard } from "./CourseCard"
import { useCourseContext } from "../context/coursesContext"
import { Loading } from "./Loading"

export const PurcahsedCourses = ()=>{
    const [purchasedCoursesIDs, setpurchasedCoursesIDs] = useState([]);
    const [PurchasedCourses,setPurchasedCourses] = useState([])
    const {courses} = useCourseContext()   
    const [loading,setloading]  = useState(true)
   
    console.log(courses)
  
   
    useEffect(()=>{
        async function purchasedCourse() {
            try {
                const res = await axios.get("http://localhost:3000/user/purchasedCourses", {
                    headers: {
                        "Authorization": 'Bearer ' + localStorage.getItem("token")
                    }
                });
                const data = res.data;
                console.log(data);
                setpurchasedCoursesIDs(data.purchasedCourses);
                console.log("Updated purchasedCoursesIDs:", purchasedCoursesIDs);
                setloading(false);
            } catch (error) {
                console.error("Error fetching purchased courses:", error);
                setloading(false);
            }
        }
        purchasedCourse();
},[])

useEffect(() => {
    const purchasedCoursesData = courses.filter(course => purchasedCoursesIDs.includes(course._id));
    setPurchasedCourses(purchasedCoursesData);
}, [courses, purchasedCoursesIDs]);



if(loading){
    return <Loading></Loading>
}

    return <>
          <div style= {{display:"flex", flexWrap:"wrap",justifyContent:"center"}}>
          {
          PurchasedCourses.length > 0 ? (
            PurchasedCourses.map(item => (
              <Coursecard key={item._id} course={item} isPurcahsed={true}/>
            ))
          ) : (
            <Typography>No purchased courses yet.</Typography>
          )
          
          }
          
        </div>
    </>
}