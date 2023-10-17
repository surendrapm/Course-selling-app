import { Card, Typography ,TextField,Button, InputLabel, FormControl, Select, MenuItem} from "@mui/material"
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import {  useState } from "react"
import { useNavigate } from "react-router-dom";



function CourseInputForm({
  Isupdate,
  Createcourse,
  Updatecourse,
  Deletecourse,
  title,
  setTitle,
  Description,
  setDescription,
  imageLink,
  setimageLink,
  category,
  setCategory,
  price,
  setPrice,
  publish,
  setPublished
}) {
   
      const[message,setMessage] = useState("");       
        const navigate = useNavigate()
     return <>
       <div style={{ }}>
             <div style={{
                display:"flex",
                justifyContent:"center",
                marginTop:300,
                
             
             }}>
            <Typography variant={'h6'} >
          {Isupdate?"Update Course here...":"Create New Course here..."}
            </Typography>
            </div>
             <div style={{
                display:'flex',
                justifyContent:'center'
             }}>
                  <Card variant="outlined"
                    style={{
                        width:400,
                        padding:20,
                
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
                 
                   <FormControl fullWidth style={{marginBottom:10}}>
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

                <FormControl fullWidth>
                <FormLabel id="demo-row-radio-buttons-group-label">Is-published</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={publish}
                  onChange={(e)=>{
                    setPublished(e.target.value)
                      console.log(publish)
                  }
                    }
                >
                <FormControlLabel value={true} control={<Radio />} label="True" />
                <FormControlLabel value={false} control={<Radio />} label="False" />
                
         </RadioGroup>

          </FormControl>
               
           {Isupdate?(<><Button size={'large'} variant="contained"
               style={{ marginTop: "10px" }}
               onClick={() => (
                 Isupdate ? Updatecourse() : Createcourse(),
                 navigate('/admin/courses')
               )}
             >{Isupdate ? "Update" : "add"}</Button><Button
              style={{ marginTop: "10px" ,
              color:"red"
            }}
             onClick={()=>{
               alert(`cofirm to delete ${title} course`)
               Deletecourse()
             }}
             >Delete</Button></>
           ):(
                  <Button variant="contained"
                  style={{marginTop:"10px"}}
                  onClick={()=>{
                    Createcourse()
                  }}
                  >Add course</Button>
                )}
                  
              </Card>
             
             </div>
              
        </div>
     
     </>

}












export default CourseInputForm