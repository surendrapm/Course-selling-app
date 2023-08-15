import {Button} from "@mui/material"

function CustomButton(props){
    
    return <>
        <Button variant="contained"style={{marginTop:20}}
         onClick={()=>{
            props.handleCreateCourse()
         }}
        >{props.btnTitle}</Button>
    </>
}

export default CustomButton