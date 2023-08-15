import { Button, Card, Typography } from "@mui/material"
import { useNavigate, useParams } from "react-router-dom"
function CourseCard({course}){
       const navigate = useNavigate()
    return <div style={{display:"flex",marginTop:50,justifyContent: 'center',width:"100%"}}>
        <Card style={{
      
      margin:10,
      width:350, 
      minHeight:200,
      borderRadius:20,
      marginRight:50,
      paddingBottom:15,
      zIndex:2
  }}>
      <img src={course.imageLink} style={{width:350}} />
      <div style={{marginLeft:10}}>
          <Typography textAlign={"center"} variant="h4">{course.title}</Typography>
          <Typography variant="subtitle2" style={{color:"grey"}}>Price</Typography>
          <Typography variant="subtitle1" >
            ${course.price} 
            </Typography>
            <Button size = {'large'} variant="contained"
           onClick={()=>{
            console.log(course._id)
           navigate("/courses/" + course._id);
           }}
        >Update</Button> 
          <Button size = {'large'} variant="contained">delete</Button>
      </div>
   </Card>
  </div>
}


export default CourseCard