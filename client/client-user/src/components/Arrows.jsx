import Slider from "react-slick";
import LeftArrow from "../assets/left-arrow.svg"
import RightArrow from "../assets/right-arrow.svg"

export const SampleNextArrow =(props)=>{
    const { className, style, onClick } = props;
  
    return (
      <div
        style={{ ...style, display: "block", background: "lightblue" ,
        position:"relative",
        left:"95%",
        top:"-16rem",
        zIndex:"1",
        height:"4rem",
        width:'4rem',
        borderRadius:"50px"
      }}
        onClick={onClick}>
        <img
        src={RightArrow}
        alt="prevArrow"
        style={{ fontSize: "50px",
        position:"absolute",
        left:"10px",
        top:"9px",
        zIndex:"1",
        height:"3rem",
        width:'3rem',
        borderRadius:"50px",
      }} // Adjust the font size here
      />
  </div>
    );
  }
  

export const SamplePrevArrow = (props)=> {
  
    const { className, style, onClick } = props;
    return (
      <div
        
        style={{ ...style, display: "block", background: "lightgrey" ,
        position:"relative",
        left:"2%",
        top:"14rem",
        zIndex:"1",
        height:"4rem",
        width:'4rem',
        borderRadius:"50px"
  
      }}
        onClick={onClick}>
        <img
        src={LeftArrow}
        alt="prevArrow"
        style={{ fontSize: "50px",
        position:"absolute",
        left:"10px",
        top:"9px",
        zIndex:"1",
        height:"3rem",
        width:'3rem',
        borderRadius:"50px",
      }} // Adjust the font size here
      />
    </div>
    );
  }
  

 