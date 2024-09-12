import React from 'react';
import '../CSS/main.css'; 
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="navbar" >
          <Link to="/main"><img src="/sosmed.jpg" alt="Logo" className="revature" /></Link>
         <div className='navbutton' ><Link to="/profile" style={{ textDecoration: 'none' }}> <h5>Profile</h5></Link></div> 
          <div className='navbutton'><Link to ="/post" style={{ textDecoration: 'none' }}> <h5>Post</h5></Link></div>
            
    </div>
  );
}

export default Navbar;