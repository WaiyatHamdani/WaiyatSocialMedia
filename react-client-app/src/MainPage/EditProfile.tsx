import React, { useEffect, useState } from 'react'
import User from '../fetchData/User';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function EditProfile() {
    const [userId, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [bio, setBio] = useState<string>("");
    const [followedUsers, setFollowedUsers] = useState<any>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const currentUserUrl = User.loadLocal();
        if (currentUserUrl) {
            console.log(`User URL: `, currentUserUrl);

            axios.get(currentUserUrl)
                .then(response => {
                    console.log('User data fetched: ', response.data);
                    setUserId(response.data.user_id);
                    setUsername(response.data.username);
                    setPassword(response.data.password);
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name)
                    setBio(response.data.bio ? response.data.bio : null);
                    setFollowedUsers(response.data.followedUsers ? response.data.followedUsers : null);
                })
                .catch(error => {
                    console.error('Error fetching user: ', error)
                });
        } else {
            // TODO: update this
            console.log('no one is logged in');
        }
    }, []);

    async function updateUser() {
        await axios.put(`http://localhost:8080/users/${userId}`, 
            {
                "user_id": userId,
                "username": username,
                "password": password,
                "first_name": firstName,
                "last_name": lastName,
                "bio": bio,
                "followedUsers": followedUsers
            },
            {
                "withCredentials": true,
                headers: {
                    "Content-Type": "application/json"
                }
            }
        )
        navigate('/main');
    }
    

  return (
    <div className='profile-page'>
        <h1>Edit Profile</h1>
        <label htmlFor='username'>Username: </label>
        <input type='text' defaultValue={username} onChange={e => setUsername(e.target.value)}/> 

        <label htmlFor='firstName'>First Name: </label>
        <input type='text' defaultValue={firstName} onChange={e => setFirstName(e.target.value)}/>

        <label htmlFor='lastName'>Last Name: </label>
        <input type='text' defaultValue={lastName} onChange={e => setLastName(e.target.value)}/>

        <label htmlFor='bio'>Bio: </label>
        <textarea defaultValue={bio} onChange={e => setBio(e.target.value)} />

        <button onClick={updateUser}>Save</button>
        <Link to='/profile'>
            <button>Cancel</button>
        </Link>
    </div>
  )
}

export default EditProfile