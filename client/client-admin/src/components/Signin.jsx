import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { useState } from 'react';
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
     onClick={()=>{
        function callback2(data){
            console.log(data.token)
            localStorage.setItem("token",data.token)     
            window.location = '/'
        }
        function callback1(res){
             res.json().then(callback2)
        }
        fetch("http://localhost:3000/admin/login",{
            method:"POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization":"Bearer" + localStorage.getItem("token")
            },
            body:JSON.stringify({
                username:email,
                password:password
            })
        }).then(callback1)
     }}
     >Sign In</Button>
    
     </Card>
    </div>
     </div>
    </>
)
}

export default Signin

