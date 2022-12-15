import React from 'react';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import Contacts from '../components/Contacts'
import { AddContact } from '../components/AddContact';


const Account = () => {
  const { user, logout } = UserAuth();


  return (<>
    <Header></Header>
        <div className='subHeader'>
          <h1>Account</h1>
          <p>account information</p>
          <p>User Email: {user && user.email}</p>
          <p>Your Account ID is {user && user.uid}</p>
        </div>
        <div className='container_flex'>
            <div className='grid'>
              <div className='add_contact'>
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
