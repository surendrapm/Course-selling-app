
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup"
import Appbar from "./components/Appbar"
import Signin from "./components/Signin"
import Createcourse from './components/Createcourse';
import Courses from './components/Courses';
import Course from './components/Course';
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


 


function App() {


  return (
    <RecoilRoot>
    <div style={{width:"100vw" , height :"100vh", backgroundColor :"#eeeeee"}}>
       
      <Router> 
      <Appbar></Appbar>
      <Routes>
           <Route path={"user/signin"} element={<Signin/>}></Route>
           <Route path={"user/signup"} element={<Signup/>}></Route>
           <Route path={'user/createcourse'} element={<Createcourse/>}></Route>
           <Route path={'user/courses'} element={<Courses/>}></Route>
           <Route path={'/buycourse/:courseId'} element={<BuyCourse/>}></Route>
           <Route path={'/'} element={<Landing/>}></Route>
           <Route path={'user/home'} element={<Homepage/>}></Route>
       </Routes>
      </Router>
      
    </div>
    </RecoilRoot>
  )
}

export default App
