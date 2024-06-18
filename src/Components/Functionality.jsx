import React from 'react'
import MYDropdown from './MYDropdown';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Functionality = ({ email, fname, setIsAuthenticated }) => {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('is_auth',false)
    setIsAuthenticated(false)
    navigate('/login')
  }

  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="nav">
            <div className="" title='Our Products'>
              <MYDropdown />
            </div>
            <div style={{marginLeft:"10px"}}>
              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip>
                    <div>Aurora account</div>
                    <div>{email}</div>
                  </Tooltip>
                }
              >
                <div style={{ backgroundColor: "#CDFADB", border: "1px solid #294B29", borderRadius: "20px", paddingLeft: "15px", paddingRight: "15px", paddingBottom: "5px", paddingTop: "5px" }}>
                  {fname}
                </div>
              </OverlayTrigger>
            </div>
            <div style={{marginLeft:"10px"}}>
              <button onClick={logout} className='btn btn-success btn-sm' type='btn'>logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Functionality
