import React, { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import '../CSS/main.css';
import { Link } from 'react-router-dom';
import User from '../fetchData/User'; 

function Logins() {
  const navigate = useNavigate();
  useEffect(() => {
    function handleLogin(event: Event) {
      event.preventDefault();
      loginRequest(event);
      
      //let navigate this to main page
      navigate('/main');
    }

    const form = document.getElementById('form');
    form?.addEventListener('submit', handleLogin);

    return () => {
      form?.removeEventListener('submit', handleLogin);
    };
  });

  return (
    <div className="page-container">
      <div className="form">
        <form id="form">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required /> <br />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required /> <br />
          <button type="submit">Login</button>
        </form>
      </div>

      <div className="boxCircle col col12">
      <p><Link to="/register">Register</Link></p>
      </div>
    </div>
  );
}

function loginRequest(event: Event) {
  event.preventDefault();
  const url = 'http://localhost:8080/users/login';
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  const data = {
    username: username,
    password: password
  };

  console.log('Sending login request to:', url);
  console.log('Request data:', data);

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    console.log('Received status:', response.status);
    if (response.ok) {
      return response.json().catch(() => ({}));
    } else {
      return response.text().then(text => {
        let errorData = {};
        try {
          errorData = text ? JSON.parse(text) : {};
        } catch (e) {
          console.error('error response JSON:', e);
        }
        console.error('Error data:', errorData);
        throw new Error('Status: ' + response.status);
      });
    }
  })
  .then(data => {
    console.log('Success:', data);
    //window.location.href = `http://localhost:8080/users/${username}`; // redirect to  full json to see data to get Axios later 

    const userUrl = `http://localhost:8080/users/${username}`;
    const user = new User(userUrl);
    user.saveLocal();

  })
  .catch(error => {
    console.error('Error fetch:', error);
    alert('Error fetch: ' + error.message);
  });
}

export default Logins;
