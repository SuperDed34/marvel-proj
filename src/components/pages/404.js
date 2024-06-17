import { Link } from "react-router-dom";
import ErrorMessage from "../errorMessage/ErrorMessage";

const NotFound = () => {
  return (
    <div style={{
      width: "100%",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div style={{width: '30%'}}>
        <ErrorMessage />
      </div>
      <p style={{color:"red", fontSize:"25px"}}>Page not found</p>
      <Link to='/'>Return to main</Link>
      </div>
    )
}

export default NotFound