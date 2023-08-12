import { useEffect , useState} from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Box, Button, Card, Divider, Grid, List, TextField, Typography } from "@mui/material";
import axios from "axios";
import { Loading } from "./Loading";

export const BuyCourse = ()=>{
    let { courseId } = useParams();
    const [courses , setCourses] = useState([])
  const [loading,setLoading] = useState(true)
    
      const editCourse = async () => {
                const response =await axios.get("http://localhost:3000/user/courses",{
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
    <GrayTopper course={course} />
    <Grid container>
            <Grid item lg={8} md={12} sm={12}>
            <DetailsCard  
              course={course}
              setCourses={setCourses}/>
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
            <CourseCard
               title={course.title}
               Description={course.Description}
               price={course.price}
               imageLink={course.imageLink}
               _id={course._id}
            />
            </Grid>
         </Grid>
    </div> 
}


function GrayTopper({course}){

  return <div style={{height:250, background:'#212121',top:0,width:"100vw",zIndex:0,marginBottom:-250}}>
        <div style={{height:250, display:"flex", justifyContent:"center", alignItems:"center"}}>
              <div>
                <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign={"center"}>
                     {course.title}
                </Typography>
                <Typography style={{color:"white",fontWeight:600}} variant="h3" textAlign={"center"}>
                     {course.Description}
                </Typography>
              </div>
        </div>
  </div>
}








function DetailsCard({course,setCourses}){

    const [title,setTitle] = useState(course.title)
    const [Description, setDescription] = useState(course.Description)
    const [imageLink,setimageLink] = useState(course.imageLink)
    const [price,Setprice] = useState(course.price) 
    const navigate = useNavigate()

    return <>
    <div style={{ display: "flex", justifyContent: "center", }}>
        <Card variant="outlined" style={{maxWidthdth: 600,marginTop:250}}>
       <div style={{padding:20}}>
              <Typography style={{marginBottom:10}}> Course Details
      </Typography>
  
       

          <Button variant="contained"
            style={{
              marginTop: 20
            }}
            onClick={async () => {

          const res = await axios.get("http://localhost:3000/user/courses/" + course._id, {
            headers:{
              "Authorization" : "Bearer " + localStorage.getItem("token"),
            }
      
              }).then(res=>{
                 if(res.ok) return res.json()
              }).then(({url})=>{
                  window.location="/"
              })
             

            
              setCourses(updatedCourse);
                alert("course updated sucessfully :)")
                navigate('/admin/courses')
            } }

          >Buy course</Button>
        </div>
        </Card>
      </div></>
   
 }

function CourseCard({ title, Description, imageLink ,price,_id}){
         
         const initPayement = (data) =>{
          console.log(data)
                   const options = {
                     key:'rzp_test_V0psw3FvY4z79P',
                     amount:data.amount,
                     currency:data.currency,
                     name:title,
                     description:"test transaction",
                     image:imageLink,
                     order_id:data.id,
                     handler: async(response) =>{
                       console.log("ooooooooooooo")
                         console.log(response)
                        try{
                           const paymentData = {
                            razorpay_order_id:response.razorpay_order_id,
                            razorpay_payment_id:response.razorpay_payment_id,
                            razorpay_signature:response.razorpay_signature
                           }
                            const res = await axios.post("http://localhost:3000/user/paymentverify/"+_id,
                            paymentData,
                            {
                              headers: {
                                
                                "Authorization": 'Bearer ' + localStorage.getItem("token")
                              }
                            })
                           
                            alert("purcahsed")
                        }catch(err){
                          console.log(error);
                        }
                     },
                     theme:{
                       color:"#3399cc",
                     },
                   };
                   const rzp1 = new window.Razorpay(options);
		              rzp1.open();
         };

           const handelPayment = async()=>{
                
               try{
                const res = await axios.post("http://localhost:3000/user/courses/"+ _id,
                {},{
                  headers: {
                    "Authorization": 'Bearer ' + localStorage.getItem("token")
                  }
                })
                        const data = res.data
                   initPayement(data.data)
               }catch(error){
                    console.log(error)
               }
         }

  
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
          <Typography textAlign={"center"} variant="h4"></Typography>
          <Typography textAlign={'center'}>Get access to only this course forever when you buy it for the price below.</Typography>
          <Typography variant="subtitle2" style={{color:"grey"}}>Price</Typography>
          <Typography  variant="h3" fontWeight={700}>
          ₹ {price} 
            </Typography>
         
            
                





          <Button size = {'large'} variant="contained"style={{width:"330px"}}
           onClick={()=>{
               handelPayment()
           }}   
      
           >buy </Button>
          <Button size = {'large'}  fullWidth>apply coupon</Button>
         <Box  sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',marginTop:2 }}>
         <Divider/>
         <Typography variant="subtitle2" style={{color:"grey"}}>What You Will get :</Typography>
           <List>

           </List>

         </Box>
         
               
      </div>
   </Card>
  </div>
}


