import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordV, setPasswordV] = useState('');
  const [error, setError] = useState('')
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if(password != passwordV){

    }else{
        try {
          await createUser(email, password);
          navigate('/account')
        } catch (e) {
          setError(e.message);
          console.log(e.message);
        }
      };
    }


  return (
  <>
  <Header></Header>
    <div className='cardHolder'>
      <div className='card'>
        <div>
          <div>
            <h1>Sign up for a free account</h1>
            <p>
              Already have an account yet?{' '}
              <Link to='/' className='linkPlain'>
                Sign in.
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Email Address</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type='email'
                />
            </div>
            <div>
              <label>Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type='password'
                />
            </div>
            <div>
              <label>Verify Password</label>
              <input
                onChange={(e) => setPasswordV(e.target.value)}
                type='passwordV'
                />
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
