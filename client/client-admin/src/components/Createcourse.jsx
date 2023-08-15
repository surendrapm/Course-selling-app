import { Card, Typography ,TextField,Button, InputLabel, FormControl, Select, MenuItem} from "@mui/material"
import { useState } from "react"
import axios from "axios"
import CourseInputForm from "./CourseInputForm"

function Createcourse(){
 
    const [title,setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [imageLink,setimageLink] = useState('')
    const [price,setPrice] = useState(0)
    const [category,setCategory] = useState('')

const inputProps = {
 title,setTitle,
 Description,setDescription,
 imageLink,setimageLink,
 price,setPrice,
 category,setCategory

}
  
    return <>
          <CourseInputForm {...inputProps}/>
          </>
 
}


export default Createcourse