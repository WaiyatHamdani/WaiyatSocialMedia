import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import User from '../fetchData/User'; 
import { Link } from 'react-router-dom';
import Posts from './Posts';

function UserPage() {
  const [username, setUsername] = useState<string | null>(null);
  const [firstname, setfirstname] = useState<string | null>(null);
  const[lastname, setlastname] = useState<string | null>(null);
  const [bio, setBio] = useState<string | null>('Bio Not found');
 

  useEffect(() => {

    const userUrl = User.loadLocal();
    if (userUrl) {
    
      axios.get(userUrl)
        .then(response => {
            console.log('User data fetched:', response.data);
            console.log(`ServertoUser_Message: ${response.data.username} Arigato for coming to our social media, my benevolent!`);
          setUsername(response.data.username);
          setfirstname(response.data.first_name)
          setlastname(response.data.last_name)
          setBio(response.data.bio);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    } else {
      console.log('Owh no T.T we cannot found URL , Are you sure the mapping is right?!!.');
    }
  }, []);

  return (
    <div>
      <Posts />
      <div className="sidebar">
        <h2 id="username">Username: {username || 'null'}</h2>
        <p id="Bio">Bio: {bio || 'null'}</p>
        <p id="Firstname">First_name: {firstname || 'null'}</p>
        <p id="lastname">Last_name: {lastname || 'null'}</p>
        <div className="link-container">
          <div className="link-box">
            <Link to="/follow" className="link">Follow User</Link>
            {/*<Link to="/register" className="link">logout</Link>*/}
            <Link to="/logout" className="link">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserPage;
