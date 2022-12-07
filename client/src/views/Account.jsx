import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import Contacts from '../components/Contacts'
import { AddContact } from '../components/AddContact';


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
    <div className='innerBody'>
      <h1>Account</h1>
      <p>account information</p>
      <p>User Email: {user && user.email}</p>
      <p>Your Account ID is {user && user.uid}</p>

      <button onClick={handleLogout}>
        Logout
      </button>
    <div>

    <div>
      <AddContact></AddContact>
    </div>

    </div>
      <Contacts props={user.uid}/> 
    </div>
   </>
  );
};
//must use the word props when assigning props to a component
//the props being passed to Contacts is used to run the useEffect in the component to keep rendering the contacts.

export default Account;
