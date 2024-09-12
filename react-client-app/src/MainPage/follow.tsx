import React, { useState, useEffect } from 'react';
import axios from 'axios';
import User from '../fetchData/User'; 
import { Link } from 'react-router-dom';
import '../CSS/table.css'; 

interface Users {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    bio: string;
    followedUsers: Users[];
  }

function Follow() {
  let [currentUser, setCurrentUser] = useState<Users | null>(null);
  const [allUsers, setAllUsers] = useState<Users[]>([]);
  const CURRENT_USER_URL = User.loadLocal();
  const BASE_URL = 'http://localhost:8080/users';
   

  useEffect(() => {
    if (CURRENT_USER_URL) {
      axios.get(CURRENT_USER_URL)
        .then(response => {
          console.log('profile user data fetched:', response.data);
          setCurrentUser(response.data);
        })
        .catch(error => {
          console.error('Error fetching profile user:', error);
        });
    } else {
      console.log('No URL found for the profile user.');
    }


    axios.get<Users[]>(BASE_URL)
      .then(response => {
        setAllUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, [CURRENT_USER_URL]);

  
  function handleFollow(userId: number, user: Users) {
    console.log("profile user id :",currentUser?.user_id)
    console.log("the user id followed: ",userId)
    //im using spread i leave the url fo rpeople to understand it later
    //https://stackoverflow.com/questions/64795051/axios-post-request-body-data-specifically-pass-not-being-recoginized
    //https://www.w3schools.com/react/react_es6_spread.asp
    //tenary operator : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
    const updatedFollowedUsers = currentUser?.followedUsers ? [...currentUser.followedUsers, user] : [user];

    const updateuser = {...currentUser, followedUsers:updatedFollowedUsers};
    console.log("updated user adding follow: ",updateuser);
    console.log(`profile user url: ${BASE_URL}/${currentUser?.user_id}`);
    axios.put(`${BASE_URL}/${currentUser?.user_id}`, updateuser)
    .then(response => {
      setCurrentUser(response.data);
      console.log(`User with ID ${userId} followed.`);
    })
    .catch(error => {
      console.error('Error following user:', error);
    });
  }

  function handleUnFollow(userId: number, user: Users) {
    const followedUsers = currentUser?.followedUsers
    
    if (followedUsers) {
      for (let i = 0; i < followedUsers.length; i++) {
        if (followedUsers[i].user_id === userId) followedUsers?.splice(i, 1);
      }
    }
    
    axios.put(`${BASE_URL}/${currentUser?.user_id}`, currentUser)
      .then(response => {
        setCurrentUser(response.data);
        console.log(`User with ID ${userId} unfollowed.`);
      })
      .catch(error => {
        console.error('Error unfollowing user:', error);
      });
  }
  

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container">
      <h2 className="title">{currentUser.username}'s Follow Page</h2>
      <p className="bio">{currentUser.bio || 'No bio available'}</p>
      <p>Following: {currentUser.followedUsers ? currentUser.followedUsers.length : 0}</p>
  
      <h3>All Users</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Follow</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map(user => (
            <tr key={user.user_id}>
              <td>{user.username}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>
                <button onClick={() => handleFollow(user.user_id, user)}>Follow</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
      <h3>Users You Follow</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>UnFollow</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.followedUsers && currentUser.followedUsers.length > 0 ? (
            currentUser.followedUsers.map(user => (
              <tr key={user.user_id}>
                <td>{user.username}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <button onClick={() => handleUnFollow(user.user_id, user)}>UnFollow</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="centered">You are not following anyone.</td>
            </tr>
          )}
        </tbody>
      </table>
  
      
    </div>
  );
}

export default Follow;