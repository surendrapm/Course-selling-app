// CourseContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [courses, setCourses] = useState([]);
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
  return (
    <CourseContext.Provider value={{ courses, setCourses ,loading, setLoading}}>
      {children}
    </CourseContext.Provider>
  );
}

export function useCourseContext() {
  return useContext(CourseContext);
}
