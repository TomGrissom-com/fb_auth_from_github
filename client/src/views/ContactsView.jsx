import React from 'react';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import Contacts from '../components/Contacts'
import Sidebar from '../components/Sidebar';


const ContactsView = () => {
  const { user } = UserAuth();
  
  return (<>
    <Header data={"Contacts"}></Header>
    <Sidebar/>
    <div className='main_content'>
      <div className='grid8x8'>
        <Contacts props={user.uid}></Contacts>
      </div>
    </div>
   </>
  );
};
//must use the word props when assigning props to a component
//the props being passed to Contacts is used to run the useEffect in the component to keep rendering the contacts.

export default ContactsView;
