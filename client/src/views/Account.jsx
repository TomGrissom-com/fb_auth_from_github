import React from 'react';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import Contacts from '../components/Contacts'
import { AddContact } from '../components/AddContact';


const Account = () => {
  const { user, logout } = UserAuth();


  return (<>
    <Header data={"Account"}></Header>
    <div className='gridSimple'>
        <div className='grid_userData card_plain p8'>
          <h3>Account Information</h3>
          <p>User Email: {user && user.email}</p>
        </div>
        <div className='grid_addContacts'>
          <AddContact></AddContact>
        </div>
        <div className='grid_contacts'>
            <Contacts props={user.uid}/>
        </div>
    </div>
   </>
  );
};
//must use the word props when assigning props to a component
//the props being passed to Contacts is used to run the useEffect in the component to keep rendering the contacts.

export default Account;
