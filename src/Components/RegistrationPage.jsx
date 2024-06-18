import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

const RegistrationPage = ({registration}) => {

  const navigate = useNavigate()

  const [registrationData, setRegistrationData] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: ''
  });

  const [error,setError] = useState({
    text:"",
    name:""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({ ...registrationData, [name]: value });
  };
  
  const handleRegistration = (e) => {
    e.preventDefault();
    if (!registrationData.name || !registrationData.email || !registrationData.password || !registrationData.cpassword) {
      setError({ text: "All fields are required!", name: "all" });
    } else if (registrationData.password !== registrationData.cpassword) {
      setError({ text: "Passwords do not match!", name: "cpassword" });
    } else {
      registration(registrationData)
      setError({ text: "", name: "" });
      setRegistrationData({ name: "", email: "", password: "", cpassword: "" });
      navigate('/login');
    }
  };


  return (
    <>
      <div className="container">
        <div className="row">
          <div className='col-sm-12 text-center mt-2'>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPofIU2OXaHk_DNxD03UzPuZFgGUcIlHwDCQ&usqp=CAU" alt="Aurora" style={{ height:"70px", width:"300px" ,borderRadius:"20px", mixBlendMode:"darken", marginBottom:"-30px",cursor:"pointer"}}  />
          </div>
        </div>
        <div className="row">
          <div className='col-lg-5 col-md-5 col-sm-9'>
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
              <h4 className='alert alert-success text-center' style={{ borderRadius: "30px" }}>Registration</h4>
              {error.name === "all"?<p style={{color:"red",textAlign:"center"}}>{error.text}</p>:null}
              <div className="form-group">
                <label htmlFor="name">Full name:</label>
                <input
                  name="name"
                  type="text"
                  value={registrationData.name}
                  onChange={handleChange}
                  className="form-control"
                  id="name"
                  placeholder="Username"
                  style={{ backgroundColor: "#A3C9AA", border: "1px solid #294B29", borderRadius: "20px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  name="email"
                  type="email"
                  value={registrationData.email}
                  onChange={handleChange}
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  style={{ backgroundColor: "#A3C9AA", border: "1px solid #294B29", borderRadius: "20px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input
                  name="password"
                  type="password"
                  value={registrationData.password}
                  onChange={handleChange}
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  style={{ backgroundColor: "#A3C9AA", border: "1px solid #294B29", borderRadius: "20px" }}
                />
              </div>
              <div className="form-group">
                <label htmlFor="c-password">Confirm Password:</label>
                <input
                  name="cpassword"
                  type="password"
                  value={registrationData.cpassword}
                  onChange={handleChange}
                  className="form-control"
                  id="c-password"
                  placeholder="Confirm Password"
                  style={{ backgroundColor: "#A3C9AA", border: "1px solid #294B29", borderRadius: "20px" }}
                />
                {error.name === "cpassword"?<p style={{color:"red",textAlign:"center"}}>{error.text}</p>:null}
              </div>
              <div className='text-center mt-2'>
                <button type="submit" className="btn btn-success" onClick={handleRegistration}>Register</button>
              </div>
              <div className='align-items-center d-flex justify-content-center mt-2'>
                <h6>Already a member <Link to="/login" className='link-class'>Login</Link></h6>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegistrationPage;
