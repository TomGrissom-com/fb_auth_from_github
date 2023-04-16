import React from 'react';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import Sidebar from '../components/Sidebar';
import UserInfo from '../components/UserInfo';

const Dashboard = () => {
  const { user, logout } = UserAuth();


  return (<>
    <Header data={"Account"}></Header>
    <Sidebar/>
    <div className='main_content'>
      <div className='gridSimple'>
          <div className='grid_userData card_plain p8'>
            <h3>Account Information</h3>
              <UserInfo props={user}></UserInfo>
          </div>
      </div>
    </div>
   </>
  );
};
//must use the word props when assigning props to a component
//the props being passed to Contacts is used to run the useEffect in the component to keep rendering the contacts.

export default Dashboard;
