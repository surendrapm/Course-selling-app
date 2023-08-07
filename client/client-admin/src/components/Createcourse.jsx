import { Card, Typography ,TextField,Button} from "@mui/material"
import { useState } from "react"
import axios from "axios"

function Createcourse(){
 
    const [title,setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [imageLink,setimageLink] = useState('')
    const [price,setPrice] = useState(0)
    return (
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
                fullWidth={true}
                id="desc-ip"
                label="Description"
                variant="outlined"
                onChange={(e)=>{
                    setDescription(e.target.value)
                  }}
             /> 
             <br/> <br/> 
           <TextField 
                fullWidth={true}
                id="img-ip"
                label="Image link"
                variant="outlined"
                onChange={(e)=>{
                    setimageLink(e.target.value)
                  }}
             />
                  <br /><br />
            <TextField 
                fullWidth={true}
                id="price-ip"
                label="Price"
                variant="outlined"
                onChange={(e)=>{
                    setPrice(e.target.value)
                  }}
             />            
                   
             <Button variant="contained"
                 style={{
                    marginTop:20
                 }}
                 onClick={async ()=>{
                    axios.post("http://localhost:3000/admin/courses",{
                            title:title,
                            Description:Description,
                            imageLink:imageLink,
                            published:true,
                            price:price
                    },{
                      headers:{
                        "Authorization":"Bearer " + localStorage.getItem("token")
                      }
                    })
                      alert("Added Course!")
                 }}
                  >add course</Button>
              </Card>
             
             </div>
              
            

        </div>
        
    )
}


export default Createcourse