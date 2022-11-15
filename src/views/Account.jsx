import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import Contacts from '../components/Contacts'


const Account = () => {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
      console.log('You are logged out')
    } catch (e) {
      console.log(e.message);
    }
  };

  return (<>
    <Header></Header>
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <p>account information</p>
      <p>User Email: {user && user.email}</p>
      <p>Your Account ID is {user && user.uid}</p>

      <button onClick={handleLogout} className='border px-6 py-2 my-4'>
        Logout
      </button>
    <div>

    </div>
      <Contacts props={user.uid}/>
    </div>
   </>
  );
};

export default Account;
