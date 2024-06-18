import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Functionality from './Functionality';

const HomeComponent = ({ registerData, loginData, parentQuery, setIsAuthenticated }) => {
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [input, setInput] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (registerData) {
      const firstName = registerData.email ? registerData.email.charAt(0).toUpperCase() : '';
      setFname(firstName);
      setEmail(registerData.email);
    } else if (loginData) {
      const firstName = loginData.email ? loginData.email.charAt(0).toUpperCase() : '';
      setFname(firstName);
      setEmail(loginData.email);
    } else {
      let key = localStorage.key(1);
      let data = localStorage.getItem(key);
      let existData = JSON.parse(data);
      setEmail(existData.email);
      setFname(existData.email.split('@')[0].charAt(0).toUpperCase());
    }
  }, [registerData, loginData]);

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    parentQuery(input);
    if (input) {
      navigate('/search');
    }
  };

  return (
    <div className="container">
      <div className="row mt-5 justify-content-center text-center">
        <Functionality email={email} fname={fname} setIsAuthenticated={setIsAuthenticated} />
        <div className="col-lg-12 col-md-12 col-sm-12 mt-5">
          <div style={{ backgroundColor: '#A3C9AA', display: 'inline-block' }}>
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPofIU2OXaHk_DNxD03UzPuZFgGUcIlHwDCQ&usqp=CAU"
              alt="Aurora"
              style={{ height: 'auto', width: '100%', maxWidth: '300px', borderRadius: '20px', mixBlendMode: 'darken', cursor: 'pointer' }}
            />
            <input
              type="text"
              className="form-control input"
              style={{
                backgroundColor: '#A3C9AA',
                border: '1px solid #294B29',
                borderRadius: '20px',
                width: '100%',
                minWidth: '350px',
                marginTop: '-20px',
                height: '40px',
                paddingLeft: '50px',
              }}
              onChange={handleChange}
            />
            <i className="fa-solid fa-magnifying-glass icons" onClick={handleSubmit}></i>
            <button type="button" className="btn btn-success mt-3" onClick={handleSubmit}>
              Aurora search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
