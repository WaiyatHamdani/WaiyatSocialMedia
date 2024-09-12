import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Logins from './RegisterLogin/Logins';
import Registers from './RegisterLogin/Registers';
import UserPage from './MainPage/UserPage';
import Logout from './MainPage/Logout';
import Navbar from './navbar/Navbar';
import Profile from './MainPage/Profile';
import EditProfile from './MainPage/EditProfile';
import Follow from './MainPage/follow';
import Posts from './MainPage/Posts';

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Logins />} />
          <Route path="/register" element={<Registers />} />
          <Route path="/main" element={<UserPage />} />
          <Route path="/logout" element={<Logout />}/>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/follow' element={<Follow />}/>
          <Route path='/post' element={<Posts />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
