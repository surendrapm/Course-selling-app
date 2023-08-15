import { Card, Typography ,TextField,Button, InputLabel, FormControl, Select, MenuItem} from "@mui/material"
import { useState } from "react"
import axios from "axios"
import CustomButton from "./CustomButton"




function CourseInputForm({course,setC}){
  const {title, setTitle, Description, setDescription, imageLink, setimageLink, price, setPrice , category ,setCategory} = props

  async function handleUpdateCourse(){
    return 
  }
  
  async function handleCreateCourse(){
       const response = axios.post("http://localhost:3000/admin/courses",{
        title:title,
        Description:Description,
        imageLink:imageLink,
        published:true,
        category:category,
        price:price
       },
       {headers:{
        Authorization:"Bearer " + localStorage.getItem("token")
       }
          
      })
      alert("Added Course!")
  }

     return <>
       <div style={{ }}>
             <div style={{
                display:"flex",
                justifyContent:"center",
             
             }}>
            <Typography variant={'h6'} >
            Add Course Here...
            </Typography>
            </div>
             <div style={{
                display:'flex',
                justifyContent:'center'
             }}>
                  <Card variant="outlined"
                    style={{
                        width:400,
                        padding:20
                    }}
                  >
                       <TextField 
                        value={title}
                        style={{marginBottom:10}}
                       fullWidth={true}
                       id="title-ip" 
                       label="Title" 
                       variant="outlined" 
                       onChange={(e)=>{ 
                          setTitle(e.target.value)
              
                          }}
              />
            
     <br /> <br />
             <TextField 
                value={Description}
                style={{marginBottom:10}}
                fullWidth={true}
                id="desc-ip"
                label="Description"
                variant="outlined"
                onChange={(e)=>{
                    setDescription(e.target.value)
                  }}
             /> 
             
           <TextField 
                value={imageLink}
                style={{marginBottom:10}}
                fullWidth={true}
                id="img-ip"
                label="Image link"
                variant="outlined"
                onChange={(e)=>{
                    setimageLink(e.target.value)
                  }}
             />
                  
            <TextField 
                value={price}
                style={{marginBottom:10}}
                fullWidth={true}
                id="price-ip"
                label="Price"
                variant="outlined"
                onChange={(e)=>{
                    setPrice(e.target.value)
                  }}
             />            
                 
                   <FormControl fullWidth>
                <InputLabel id="demo">Category</InputLabel>
                <Select labelId="demo-simple-select-label"
                  id="demo-simple"
                  value={category}
                  label="Category"
                  onChange={(e)=>{
                     setCategory(e.target.value)
                  }}
                > <MenuItem value="None">None</MenuItem>
                <MenuItem value="web-devlopment">Web Devlopment</MenuItem>
                <MenuItem value="andriod-devlopment">Android Devlopment</MenuItem>
                <MenuItem value="ai-ml">AI and Machine Learning</MenuItem>
                <MenuItem value="data-science">Data Science</MenuItem>
                <MenuItem value="web3">Web3</MenuItem>
                <MenuItem value="game-devlopment">Game Devlopment</MenuItem>
                

                </Select>
                </FormControl>
                 <CustomButton  handleCreateCourse={handleCreateCourse} btnTitle={"Add course"}/>
              </Card>
             
             </div>
              
        </div>
     
     </>

}












export default CourseInputForm