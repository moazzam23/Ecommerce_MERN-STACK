


const Loader = () => {

  const loaderStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  };

  const spinnerStyle = {
    border: '8px solid #f3f3f3',
    borderTop: '8px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 1s linear infinite',
  };
  return (
    <div style={loaderStyle}>
      Please Wait...
      <div style={spinnerStyle}></div>
    </div>
  )
}

export default Loader


