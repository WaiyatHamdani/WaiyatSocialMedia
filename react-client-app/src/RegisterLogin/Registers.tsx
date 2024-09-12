import React, { useEffect } from 'react';
import '../CSS/main.css';
import { Link } from 'react-router-dom';


function Registers() {
  useEffect(() => {
    function handleRegister(event: Event) {
      event.preventDefault();
      registerRequest(event);
    }

    const form = document.getElementById('registerform');
    form?.addEventListener('submit', handleRegister);

    return () => {
      form?.removeEventListener('submit', handleRegister);
    };
  }, []);

  return (
    <div className="page-container">
      <div className="boxNoBorderMain col col12">
        <h1>Register User</h1>
        <form id="registerform">
          <label htmlFor="firstname">Firstname</label>
          <input type="text" id="firstname" name="firstname" placeholder="Firstname" /> <br />
          <label htmlFor="lastname">Lastname</label>
          <input type="text" id="lastname" name="lastname" placeholder="Lastname" /> <br />
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Username" /> <br />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" /> <br />
          <button type="submit">Register</button>
        </form>
      </div>
      <div className="boxCircle col col12">
      <p><Link to="/">Login</Link></p>
      </div>
    </div>
  );
}

function registerRequest(event: Event) {
  event.preventDefault();
  const url = 'http://localhost:8080/users';
  const firstname = (document.getElementById('firstname') as HTMLInputElement).value;
  const lastname = (document.getElementById('lastname') as HTMLInputElement).value;
  const username = (document.getElementById('username') as HTMLInputElement).value;
  const password = (document.getElementById('password') as HTMLInputElement).value;

  const data = {
    username: username,
    password: password,
    first_name: firstname,
    last_name: lastname
  };

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      console.log('Status:', response.status);
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then(text => {
          throw new Error('Status: ' + response.status);
        });
      }
    })
    .then(data => {
      console.log('Success:', data);
      //alert("My lord you successfully register ")
      alert(`This time I want ${data.first_name} like is magnetic`)
    })
    .catch(error => {
      console.error('Error Fetching:', error);
      alert('Error Fetching: ' + error.message +' or you already register mi lord dont break our apps ');
    });
}

export default Registers;

