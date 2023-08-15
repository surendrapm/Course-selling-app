import { useEffect , useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Card, Grid, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Loading } from "./Loading";
import { UpdateCourses } from "./UpdateCourse";

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
            <UpdateCourses
              course={course}
              setCourses={setCourses}
            ></UpdateCourses>
             
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








function UpdateCard({course,setCourses}){

    const [title,setTitle] = useState(course.title)
    const [Description, setDescription] = useState(course.Description)
    const [imageLink,setimageLink] = useState(course.imageLink)
    const [price,Setprice] = useState(course.price) 
    const navigate = useNavigate()

    return <>
    <div style={{ display: "flex", justifyContent: "center", }}>
        <Card variant="outlined" style={{maxWidth: 600,marginTop:200}}>
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



export default Course;