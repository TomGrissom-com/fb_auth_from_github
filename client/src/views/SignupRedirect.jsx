import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'
import ContactServices from '../Firebase/services'
import { sendEmailVerification } from "firebase/auth";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordV, setPasswordV] = useState('');
  const [PWerror, setPWError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPWError('');
    
    if(password !== passwordV){
      setPWError("Passwords Must Match")
    }else{
      try {
        await createUser(email, password).then(cred => {
          const UID = cred.user.uid
          const User_email = email
          const dataToAdd = {
              User_email,
              UID
            }
            sendEmailVerification(cred.user)
            ContactServices.createUserAccount(cred.user.uid, dataToAdd)})
            navigate('/Dashboard')
        } catch (e) {
          setPWError(e.message);
        }
      };
    }


  return (
  <>
  <Header data={"Register"}></Header>
    <div className='container center_text'>
      <div className='child_25 card'>
        <div>
          <div>
            <h1>Sign up for a free account</h1>
            <p>Please contact us about signing up for a free account</p>
            <p>Email: <a href='Mailto:info+apptester@bettertechsol.com' target='blank'>info+apptester@bettertechsol.com</a></p>
            <p>Phone: <a href='Tel:+19362294774' target='blank'>936.229.4774</a></p>
          <h3 style={{color: "red"}}><i>NOTE: This program is in Alpha Testing 
                                    <br/> and Currently in Development 
                                    <br/> please provide feedback and suggestions to <a href='Mailto:info+appsug@bettertechsol.com' target='blank'>info@bettertechsol.com
                                    </a></i></h3>
        </div>
      </div>
    </div>
    </div>
  </>
  );
};

export default Signup;
