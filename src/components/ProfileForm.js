import React, { useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { fetchFromAPI } from "../api";
import { async } from "q";

const ProfileForm = ({ token, setToken }) => {
  const history = useHistory();
  const params = useParams();
  const { actionType } = params;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password === passwordConfirm) {
      const result = await fetchFromAPI({
        body: {
          user: {
            username,
            password,
          }
        },
        method: 'post',
        endpoint: actionType
      });

      if (result.success) {
        setToken(result.data.token);
        console.log(result.data.message);
        setErrorMessage(null);
        history.push('/profile');
      }
      else {
        setErrorMessage(result.error.message);
      }

      setPassword('');
      setUsername('');
      setPasswordConfirm('');
    }
    else {
      setErrorMessage('Entered Passwords Must Match');
    }
  }

  return (
    <>
      {token && history.push('/profile')} {/* <--not sure if this works */}

      <h1>{actionType === 'login' ? 'Log In' : 'Register'}</h1>
      <form onSubmit={handleSubmit} className='profileForm'>
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <label htmlFor='username' >User Name</label>
        <input
          type='text'
          name='username'
          value={username}
          onChange={event => setUsername(event.target.value)}
          minLength='3'
          maxLength='20'
          required
        />
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          minLength='3'
          maxLength='20'
          required
        />
        <label htmlFor='passwordConfirm'>Confirm Password</label>
        <input
          type='password'
          name='passwordConfirm'
          value={passwordConfirm}
          onChange={event => setPasswordConfirm(event.target.value)}
          minLength='3'
          maxLength='20'
          required
        />
        <button type='submit'>SUBMIT</button>
        {
          actionType === 'login'
            ? <Link to='/profile/register'>Don't have an account? Register here.</Link>
            : <Link to='/profile/login'>Already have an account? Login here.</Link>
        }
      </form>
    </>
  )
}

export default ProfileForm;