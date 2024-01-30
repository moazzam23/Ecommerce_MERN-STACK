import {  useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate= useNavigate()
    function backhandler(){
        navigate("/")
    }
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Not Found</h1>
      <p style={styles.message}>Sorry, the page you are looking for might be in another castle.</p>
    <button style={styles.button} onClick={backhandler}>Return To main page </button>
    </div>
  )
}


const styles: Record<string, React.CSSProperties> = {
    container: {
      textAlign: 'center',
      paddingTop: '20vh',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '20px',
      color: '#333',
    },
    message: {
      fontSize: '1rem',
      color: '#555',
    },
    image: {
      width: '100%',
      maxWidth: '400px',
      marginTop: '20px',
      borderRadius: '8px',
    },
    button:{
        padding:"10px",
        fontWeight:800,
        marginTop:"20px",
        border:"none",
        borderRadius:"10px"
    }
  };

export default NotFound