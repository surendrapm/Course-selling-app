
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup"
import Appbar from "./components/Appbar"
import Signin from "./components/Signin"
import Courses from './components/Courses';
import { Landing } from './components/Landing';
import Homepage from './components/HomePage';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilRoot,
} from 'recoil';
import { BuyCourse } from './components/BuyCourses';
import { PurcahsedCourses } from './components/PurchasedCourses';
import { CourseProvider } from './context/coursesContext';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

 


function App() {


  return (
    <RecoilRoot>
    <div style={{width:"100vw" , height :"100vh", backgroundColor :"#eeeeee"}}>
    <CourseProvider>
      <Router> 
      
      <Appbar></Appbar>
      <Routes>
         
           <Route path={"user/signin"} element={<Signin/>}></Route>
           <Route path={"user/signup"} element={<Signup/>}></Route>
           <Route path={"user/purchased"} element={<PurcahsedCourses/>}></Route>
           <Route path={'user/courses'} element={<Courses/>}></Route>
           <Route path={'/buycourse/:courseId'} element={<BuyCourse/>}></Route>
           <Route path={'/'} element={<Landing/>}></Route>
           <Route path={'user/home'} element={<Homepage/>}></Route>
         
       </Routes>
      </Router>
      </CourseProvider>
    </div>
    </RecoilRoot>
  )
}

export default App
