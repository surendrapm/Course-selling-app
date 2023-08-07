import { useEffect , useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Loading } from "./Loading";

function Course(){
    let { courseId } = useParams();
    const [courses , setCourses] = useState([])
  const [loading,setLoading] = useState(true)
    
      const editCourse = async () => {
                const response =await axios.get("http://localhost:3000/admin/courses",{
                headers:{
                  "Authorization" : "Bearer " + localStorage.getItem("token"),
                }
              })
                            let data = response.data
                           
                            setCourses(data.courses)
                            setLoading(false)
            }
            useEffect(() => {
              editCourse();
            },[])          
            
    

  console.log('Courses:',courses)
  let course = null;
  if(!loading){
    for(let i=0; i<courses.length ; i++){
      if(courses[i]._id == courseId){
         course = courses[i]
      }
   }
  }


 if(loading){
    return <div> 
        <Loading></Loading>
    </div>
 }

 if (!course) {
  return <div>No course found.</div>;
}

   return <div >
    <GrayTopper title={course.title} />
    <Grid container>
            <Grid item lg={8} md={12} sm={12}>
            <UpdateCard  
              course={course}
              setCourses={setCourses}/>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
            <CourseCard
               title={course.title}
               price={course.price}
               imageLink={course.imagelink}
            />
            </Grid>
         </Grid>
    </div> 
}


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






function UpdateCard({course,setCourses}){

    const [title,setTitle] = useState(course.title)
    const [Description, setDescription] = useState(course.Description)
    const [imageLink,setimageLink] = useState(course.imageLink)
    const [price,Setprice] = useState(course.price) 
    const navigate = useNavigate()

    return <>
    <div style={{ display: "flex", justifyContent: "center", }}>
        <Card variant="outlined" style={{maxWidthdth: 600,marginTop:200}}>
       <div style={{padding:20}}>
              <Typography style={{marginBottom:10}}>Update Course Details
      </Typography>
  
        <TextField
            value={title}
            style={{marginBottom:10}}
            fullWidth={true}
            id="title-ip"
            label="Title"
            variant="outlined"
            onChange={(e) => {
              setTitle(e.target.value);
            } } />

          <TextField
            value={Description}
            style={{marginBottom:10}}
            fullWidth={true}
            id="desc-ip"
            label="Description"
            variant="outlined"
            onChange={(e) => {
              setDescription(e.target.value);
            } } />
          
          <TextField
            value={imageLink}
            style={{marginBottom:10}}
            fullWidth={true}
            id="img-ip"
            label="Image link"
            variant="outlined"
            onChange={(e) => {
              setimageLink(e.target.value);
            } } />

  
          <TextField
            value={price}
            fullWidth={true}
            style={{marginBottom:10}}
            id="desc-ip"
            label="Price"
            variant="outlined"
            onChange={(e) => {
              Setprice(e.target.value);
            } } />


          <Button variant="contained"
            style={{
              marginTop: 20
            }}
            onClick={async () => {

              await axios.put("http://localhost:3000/admin/courses/" + course._id, {
                title: title,
                Description: Description,
                imageLink: imageLink,
                published: true,
                price
              }, {
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + localStorage.getItem("token")
                }
              });
              let updatedCourse = {
                // eslint-disable-next-line react/prop-types
                _id: course._id,
                title: title,
                Description: Description,
                imageLink: imageLink,
                price
              };
              setCourses(updatedCourse);
                alert("course updated sucessfully :)")
                navigate('/admin/courses')
            } }

          >update  course</Button>
        </div>
        </Card>
      </div></>
   
 }

function CourseCard({ title, Description, imageLink ,price}){
 
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
      <img src={imageLink} style={{width:350}} />
      <div style={{marginLeft:10}}>
          <Typography textAlign={"center"} variant="h4">{title}</Typography>
          <Typography variant="subtitle2" style={{color:"grey"}}>Price</Typography>
          <Typography variant="subtitle1" >
            ${price} 
            </Typography>
        
          <Button size = {'large'} variant="contained">delete</Button>
      </div>
   </Card>
  </div>
}


export default Course;