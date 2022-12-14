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
      navigate('/Dashboard')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
    }
  };

  return (
  <>
    <Header data={"Sign In"}></Header>
    <div className='container center_text'>
      <div className='child_25 card'>
        <div>
          <div>
            <h1>Sign in to your account</h1>
            <p>
              Don't have an account yet?{' '}
              <Link className='txtBLUE' to='/signup'>
                Sign up.
              </Link>
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='p5'>Email Address</label><br/>
              <input onChange={(e) => setEmail(e.target.value)} className='p8 border_rounded' type='email' />
            </div>
            <div >
              <label className='p5'>Password</label><br/>
              <input onChange={(e) => setPassword(e.target.value)} className='p8 border_rounded' type='password' />
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
