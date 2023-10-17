import { Card, Typography ,TextField,Button, InputLabel, FormControl, Select, MenuItem} from "@mui/material"
import { useEffect, useState } from "react"
import axios from "axios"
import CourseInputForm from "./CourseInputForm"

function Createcourse(props){
  console.log(props)
    const [title,setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [imageLink,setimageLink] = useState('')
    const [price,setPrice] = useState(0)
    const [category,setCategory] = useState('None')
    const [published,setPublished] = useState(true)

useEffect(()=>{
   if(props.IsUpdate){
    setTitle(props.course.title),
    setDescription(props.course.Description),
    setPrice(props.course.price)
    setimageLink(props.course.imageLink)
    setCategory(props.course.category)
    setPublished(props.course.published)
   }
},[props.course])




   
   //to create course 
   async function handleCreateCourse(){
    const response = axios.post("http://localhost:3000/admin/courses",{
     title:title,
     Description:Description,
     imageLink:imageLink,
     category:category,
     price:price
    },
    {
     headers:{
     Authorization:"Bearer " + localStorage.getItem("token")
    }
       
   })
   alert("Added Course!")
}
//function to update the course
async function handleUpdateCourse(){
   const res = axios.put(`http://localhost:3000/admin/courses/${props.course._id}`,{
    title:title,
    Description:Description,
    imageLink:imageLink,
    category:category,
    price:price,
    published:published,
   
  },
  {
     headers:{
       Authorization: 'Bearer ' + localStorage.getItem("token")
     },
     
    })
   const data = res.data
   alert("course updated sucessfully :)")
    
}

//function to delete course
function handleDeletecourse(){
     const res = axios.delete(`http://localhost:3000/admin/courses/${props.course._id}`,{
        headers:{
           Authorization:"Bearer " + localStorage.getItem("token")
        }
   })
        const data =  rea.data
        alert('successfully deleted course :)')
        navigate('/admin/courses')
}


    return <>
          <CourseInputForm 
          Isupdate={props.IsUpdate}
          Createcourse={handleCreateCourse}
          Updatecourse={handleUpdateCourse}
          title={title}
          setTitle={setTitle}
          Description={Description}
          setDescription={setDescription}
          imageLink={imageLink}
          setimageLink={setimageLink}
          category={category}
          setCategory={setCategory}
          price={price}
          setPrice={setPrice}
          publish={published}
          setPublished={setPublished}
          Deletecourse={handleDeletecourse}
          />
          </>
 
}


export default Createcourse