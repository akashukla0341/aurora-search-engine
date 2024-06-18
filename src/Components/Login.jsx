import React,{useState,useContext, useEffect} from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { Mycontext } from '../App';

const Login = ({login,setIsAuthenticated}) => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error,setError] = useState({
    text:"",
    name:""
  })
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };


  // login useeffe use state true get 
  const Registerdata = useContext(Mycontext)

  useEffect(()=>{
    const is_auth = localStorage.getItem('is_auth');
    if(JSON.parse(is_auth)){
      setIsAuthenticated(true)
      navigate('/home')
    }
  },[setIsAuthenticated,navigate])  


  
  

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password ) {
      setError({ text: "All fields are required!", name: "all" });
    }  else {
        const email = JSON.stringify(loginData.email)
        if(localStorage.getItem(email)){
          const dataGet =  localStorage.getItem(email);
          const objData = JSON.parse(dataGet)
          if(objData.email === loginData.email && objData.password === loginData.password){
            login(loginData)

            localStorage.setItem('is_auth',true);
              setIsAuthenticated(true)

            setError({ text: "", name: "" });
            setLoginData({ name: "", email: "", password: "", cpassword: "" });
            // setCheck(true)
            navigate('/home');
          }else{
            setError({ text: "Enter correct email or password", name: "all" });
          }
        }else{
          if(Registerdata){
            if(Registerdata.email === loginData.email && Registerdata.password === loginData.password){
              const allData = JSON.parse(JSON.stringify(loginData));
              // allData['logged'] = true
              const Data = JSON.stringify(allData)
              localStorage.setItem(email,Data)
              login(loginData)
              localStorage.setItem('is_auth',true);
              // setIsAuthenticated(true)
              setIsAuthenticated(true)
              setError({ text: "", name: "" });
              setLoginData({ name: "", email: "", password: "", cpassword: "" });
              // setCheck(true)
              navigate('/home');
            }else{
              setError({ text: "Enter correct email or password", name: "all" });
            }
          }else{
            setError({ text: "Please Sign Up", name: "all" });
          }
        }
    }
  };

  return (
    <>
      <div className="container">
      <div className="row">
          <div className='col-sm-12 text-center mt-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPofIU2OXaHk_DNxD03UzPuZFgGUcIlHwDCQ&usqp=CAU" alt="Aurora" style={{ height:"70px", width:"300px" ,borderRadius:"20px", mixBlendMode:"darken", marginBottom:"-30px", cursor:"pointer"}}  />
          </div>
        </div>
        <div className="row">
          <div className='col-lg-5 col-md-5 col-sm-12'>
            <div className="cube">
              <div className="top"></div>
              <div>
                <span style={{ "--i": 0 }}></span>
                <span style={{ "--i": 1 }}></span>
                <span style={{ "--i": 2 }}></span>
                <span style={{ "--i": 3 }}></span>
              </div>
            </div>
          </div>
          <div className='col-lg-5 col-md-5 col-sm-12 mt-4'>
            <form id='form' className='shadow-lg'>
              <h4 className='alert alert-success text-center' style={{borderRadius:"30px"}}>Login</h4>
              {error.name === "all"?<p style={{color:"red",textAlign:"center"}}>{error.text}</p>:null}
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" className="form-control" onChange={handleChange} name="email" id="email" placeholder="Email" style={{ backgroundColor: "#A3C9AA", border: "1px solid #294B29",borderRadius:"20px" }} />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" onChange={handleChange} name="password" className="form-control" id="password" placeholder="Password" style={{ backgroundColor: "#A3C9AA", border: "1px solid #294B29",borderRadius:"20px" }} />
              </div>
              <div className='text-center mt-2'>
                <button type="submit" className="btn btn-success" onClick={handleLogin}>Login</button>
              </div>
              <div className='align-items-center d-flex justify-content-center mt-2'>
                <h6>Not a member  <Link to="/" className='link-class'>Sign Up</Link></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login;
