import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react'
import './Navbar.css';

const Navbar = (props) => {
  const username = props.username
  const bearer = props.bearer
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleMouseEnter = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <nav className="navbar">
    <div className="navbar-title">Virtual Trading</div>
    <ul className="navbar-nav">
        <li>
        <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <button onClick={toggleDropdown} className="dropbtn">{username==="" ? <p>Log In</p> : <p>{username}</p>}</button>
              {dropdownVisible && (
                <div className="dropdown-content">
                  {bearer==="" ? <Link to="/">Profile</Link> : <Link to="/account">Profile</Link>}
                  <Link to="/createAccount"><p>Create Account</p></Link>
                  <Link to="/"> {username==="" ? <p>Log In</p> : <p> Log Out</p>}</Link>
                </div>
                  )}
        </div>
        </li>
        <li className="nav-item"><Link to="/stockMarket"> <p>Stock Market</p></Link></li>
        <li className="nav-item"><Link to="/trade"> <p>Trade</p></Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;