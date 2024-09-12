import React, { useEffect, useState } from 'react'
import User from '../fetchData/User';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/Profile.css';

function Profile() {
    const [username, setUsername] = useState<string | null>(null);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [bio, setBio] = useState<string | null>(null);
    const [following, setFollowing] = useState<number>(0);

    useEffect(() => {
        const userUrl = User.loadLocal();
        if (userUrl) {
            console.log(`User URL: `, userUrl);

            axios.get(userUrl)
                .then(response => {
                    console.log('User data fetched: ', response.data);
                    setUsername(response.data.username);
                    setFirstName(response.data.first_name);
                    setLastName(response.data.last_name)
                    setBio(response.data.bio ? response.data.bio : null);
                    setFollowing(response.data.followedUsers ? response.data.followedUsers.length : 0);
                })
                .catch(error => {
                    console.error('Error fetching user: ', error)
                });
        } else {
            // TODO: update this
            console.log('bad url');
        }
    }, []);

  return (
    
    <>
    {
        bio === null ?
        <div className='profile-create-page'>
            <Link to="/profile/edit">
                <button className='profile-create-button'>Create Profile</button>
            </Link>
        </div>
        :
        <div className='profile-page'>
            <h1>{username}</h1>
            <p>first name: {firstName}</p>
            <p>last name: {lastName}</p>
            <p>bio: {bio}</p>
            <p>following: {following}</p>
            <Link to="/profile/edit">
                <button>Edit Profile</button>
            </Link>
        </div>
    }
    </>
  )
}

export default Profile