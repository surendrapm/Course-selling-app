
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from "./components/Signup"
import Appbar from "./components/Appbar"
import Signin from "./components/Signin"
import Createcourse from './components/Createcourse';
import Courses from './components/Courses';
import Course from './components/Course';
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  RecoilRoot,
} from 'recoil';
import { Landing } from './components/Landing';
 


function App() {


  return (
    <RecoilRoot>
    <div style={{width:"100vw" , height :"100vh", backgroundColor :"#eeeeee"}}>
       
      <Router> 
      <Appbar></Appbar>
      <Routes>
           <Route path={"admin/signin"} element={<Signin/>}></Route>
           <Route path={"admin/signup"} element={<Signup/>}></Route>
           <Route path={'admin/createcourse'} element={<Createcourse/>}></Route>
           <Route path={'admin/courses'} element={<Courses/>}></Route>
           <Route path={'/courses/:courseId'} element={<Course />}></Route>
           <Route path={'/'} element={<Landing/>}></Route>
       </Routes>
      </Router>
      
    </div>
    </RecoilRoot>
  )
}

export default App
