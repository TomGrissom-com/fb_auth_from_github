import userEvent from '@testing-library/user-event';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import {Header} from '../components/Header'

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/account')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
  <>
    <Header></Header>
    <div className='cardHolder'>
      <div className='card'>
        <div>
          <div>
            <h1>Sign in to your account</h1>
            <p>
              Don't have an account yet?{' '}
              <Link className='linkPlain' to='/signup'>
                Sign up.
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label >Email Address</label><br/>
              <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
            </div>
            <div >
              <label >Password</label><br/>
              <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
            </div>
            <button>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
};

export default Signin;
