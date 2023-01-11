import React from 'react';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import Contacts from '../components/Contacts'
import { AddContact } from '../components/AddContact';
import Sidebar from '../components/Sidebar';


const ContactsView = () => {
  const { user, logout } = UserAuth();


  return (<>
    <Header data={"Contacts"}></Header>
    <Sidebar/>
    <div className='main_content'>
      <div className='grid8x8'>
          <div className='grid_addContacts'>
            <AddContact></AddContact>
          </div>
          <div className='grid_contacts'>
              <Contacts props={user.uid}/>
          </div>
      </div>
    </div>
   </>
  );
};
//must use the word props when assigning props to a component
//the props being passed to Contacts is used to run the useEffect in the component to keep rendering the contacts.

export default ContactsView;
