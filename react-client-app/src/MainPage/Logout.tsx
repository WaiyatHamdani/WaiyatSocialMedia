import React, { useEffect } from 'react';
import User from '../fetchData/User'; 

function Logout() {
  useEffect(() => {
    User.clearLocal();

    // Redirect to login page or home page
    window.location.href = 'http://localhost:3000';
  });

  return (
    <div>
      <h1>Logging out...</h1>
    </div>
  );
}


export default Logout;