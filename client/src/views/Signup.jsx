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
    
    if(password != passwordV){
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
            <p>
              Already have an account yet?{' '}
              <Link to='/signin' className='txtBLUE'>
                Sign in.
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='p5'>Email Address</label><br/>
              <input className='p8 border_rounded'
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                />
            </div>
            <div>
              <label className='p5'>Password</label><br/>
              <input className='p8 border_rounded'
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                />
            </div>
            <div>
              <label className='p5' style={!PWerror ? {} : {color: "red"}}>Verify Password</label><br/>
              <input className='p8 border_rounded'
                onChange={(e) => setPasswordV(e.target.value)}
                type='password'
                />
            {!PWerror ? '':<p style={{color: "red"}}>{PWerror}</p>}
            </div>
            <button>
              Sign Up
            </button>
          </form>
          <h3 style={{color: "red"}}><i>NOTE: This program is in Alpha Testing 
                                    <br/> and Currently in Development 
                                    <br/> please provide feedback and suggestions to <a href='Mailto:info@bettertechsol.com' target='blank'>info@bettertechsol.com
                                    </a></i></h3>
        </div>
      </div>
    </div>
  </>
  );
};

export default Signup;
