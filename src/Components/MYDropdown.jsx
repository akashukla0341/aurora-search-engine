import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyDropdown() {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <>
      <div className="" onClick={handleDropdownToggle}>
        <i className="fa-brands fa-slack" style={{ fontSize: "2rem", cursor: "pointer" }}></i>
      </div>

      <Dropdown show={showDropdown} onClick={handleDropdownToggle}>

        <Dropdown.Menu className='dropdown-menu-right' >
          <Dropdown.Item href="https://weather-mma.netlify.app/" target='blank'>Weather Application</Dropdown.Item>
          <Dropdown.Item href="https://translation-mma.netlify.app/" target='blank'>Translate Application</Dropdown.Item>
          <Dropdown.Item href="https://text-editor-mma.netlify.app/" target='blank'>Text Editor Application</Dropdown.Item>
          <Dropdown.Item href="https://currency-mma.netlify.app/" target='blank'>Currency Converter</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
}

export default MyDropdown;
