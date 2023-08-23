import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
function Signin(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
return(
    <>
     <div style={{
        position:"relative",
        top:150
        
    }}>
  
            <div style={{
                paddingTop:150,
                 marginBottom:10,
                 display:"flex",
                 justifyContent:"center"
                 }}>
                <Typography variant={'h6'}>
                   Welcome to Back to Coursera. Sign in below
                </Typography>
                 
            </div>
         
           
      <div style={{display:"flex",
           justifyContent:"center"
           }}>    
      <Card variant="outlined" 
           style={{width:400 ,
            padding:20
        }}
      >
  
    <TextField 
               fullWidth={true}
              id="outlined-basic" 
              label="Email" 
              variant="outlined" 
              onChange={(e)=>{
                setEmail(e.target.value)
              }}
              />
     <br /> <br />
     <TextField 
              fullWidth = {true}
              id="outlined-basic"
              label="Password" 
              variant="outlined"
              type={"password"} 
              onChange={(e)=>{
                setPassword(e.target.value)
              }}
              />
     <br /> <br />
     <Button size = {'large'} 
     variant="contained"
     onClick={async()=>{
        console.log(email,password)
         const res = await axios.post("http://localhost:3000/user/login",{
            username:email,
            password:password,
         })

         const data = res.data
         localStorage.setItem("token",data.token)
           window.location ="/"
    
     }}
     >Sign In</Button>
    
     </Card>
    </div>
     </div>
    </>
)
}

export default Signin

