import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'

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
          await createUser(email, password);
          navigate('/account')
        } catch (e) {
          setPWError(e.message);
          console.log(e.message);
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
              <Link to='/signin' className='linkPlain'>
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
        </div>
      </div>
    </div>
  </>
  );
};

export default Signup;
