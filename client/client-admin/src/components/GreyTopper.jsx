import { Button, Card, Typography } from "@mui/material"

function GrayTopper({title}){

    return <div style={{height:250, background:'#212121',top:0,width:"100vw",zIndex:0,marginBottom:-250}}>
          <div style={{height:250, display:"flex", justifyContent:"center", alignItems:"center"}}>
                <div>
                  <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign={"center"}>
                      {title}
                  </Typography>
                </div>
          </div>
    </div>
  }
  

  export default GrayTopper