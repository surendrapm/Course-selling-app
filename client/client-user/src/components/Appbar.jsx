import { Box, Button, List, SwipeableDrawer, Typography } from "@mui/material"
import { ListItem, ListItemButton, ListItemText } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Createcourse from './Createcourse'
function Appbar(){
      
  const navigate = useNavigate()
    const[userEmail , setUserEmail] = useState(null)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
               useEffect(()=>{
                   async function getUsername(){
                    const response = await axios.get("http://localhost:3000/user/me",{
                        headers:{
                            "Authorization":'Bearer ' + localStorage.getItem("token")
                        }
                       })
                      
                       const data = response.data
                          
                       if(data.username){
                        setUserEmail(data.username)
                      
                       }
                  }
                  
                        getUsername()
               
               },[])
                       
        
  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
            
             
            
      
          
              if(userEmail){
                return(
                    <>
                   <AppBar position="static">
                    
                     <div style={{
            display:"flex",
            justifyContent:"space-between",
            padding:4
        }}>
                   <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleDrawerOpen}
          >
            <MenuIcon />
          </IconButton>
            <div>
                <Typography variant={'h6'}>Coursera</Typography>
            </div>
            <div style={{display:'flex'}}>
                <div style={{marginRight:10}}>
                     <div>
                        {userEmail}
                     </div>
                </div>
                <div>
                <Button variant={"contained"}
                 onClick={()=>{
                   localStorage.setItem("token",null)
                   window.location = '/'
                 }}
                >Logout</Button>
                </div>
            </div>
        </div>
        </AppBar>
       
        <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawerClose}
         sx={250}
         role="presentation"
        >
          {/* Content of the drawer */}
           <List>
           {['Purchased Courses','Allcourses','profile'].map((text)=>(
           <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} onClick={()=>{
                switch(text){
                  case "AddCourse":
                    navigate('user/purcahsed')
                    handleDrawerClose()
                    break;
                  case 'Allcourses':
                    navigate('user/courses')
                    handleDrawerClose()
                    break;
                }
                
                
              }}/>
            </ListItemButton>
          
        </ListItem>
           ))}
           </List>
        </Drawer>
         
                    </>
                )
              }

    return(
        <AppBar position="static">
        <div style={{
            display:"flex",
            justifyContent:"space-between",
            padding:4
        }}>
        
            <div>
                <Typography variant={'h6'}>Coursera</Typography>
            </div>
            <div style={{display:'flex'}}>
                <div style={{marginRight:10}}>
                <Button variant={"contained"}
                 onClick={()=>{
                    
                    navigate("user/signup")

                 }}
                >Signup</Button>
                </div>
                <div>
                <Button variant={"contained"}
                 onClick={()=>{
                   navigate("user/signin")
                 }}
                >SignIn</Button>
                </div>
            </div>
        </div>
        </AppBar>
    )
}

export default Appbar