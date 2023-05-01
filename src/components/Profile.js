import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchFromAPI } from '../api';
import { async } from 'q';

const Profile = ({ token, setToken }) => {
  const history = useHistory();
  const [profileData, setProfileData] = useState({});

  const fetchProfile = async () => {
    const result = await fetchFromAPI({
      token,
      endpoint: '/users/me',
    });
    setProfileData(result.data);
  }

  useEffect(() => {
    fetchProfile();
  }, []);

  const logout = () => {
    setToken('');
    history.push('/profile/login');
  }

  return (
    <>
      {
        !profileData
          ? history.push('/profile/login')
          : <>
            <header className='profileHeader'>
              <h2>My Profile</h2>
              <div className='userContainer'>
                <h3 className='username'>{`User: ${profileData.username ?? ''}`}</h3>
                <button
                  className='logoutButton'
                  type='button'
                  onClick={logout}
                >Log Out
                </button>
              </div>
            </header>

            <h3 className='mHeader'>My Messages</h3>
            <div className='messagesContainer'>
              <section className='messagesSubContainer' >
                <h3 className='mSubContainerHeader'>Sent</h3>
                {
                  profileData.messages &&
                  profileData.messages.filter(message => {
                    return profileData._id === message.fromUser._id;
                  }).map((message, idx) => {
                    return (
                      <div key={message.id ?? idx} className='message'>
                        <h4>Item: {message.post.title}</h4>
                        <p>Message: {message.content}</p>
                      </div>
                    )
                  })
                }
              </section>
              <section className='messagesSubContainer' >
                <h3 className='mSubContainerHeader'>Recieved</h3>
                {
                  profileData.messages &&
                  profileData.messages.filter(message => {
                    return profileData._id !== message.fromUser._id;
                  }).map((message, idx) => {
                    return (
                      <div key={message.id ?? idx} className='message'>
                        <h4>Item: {message.post.title}</h4>
                        <p>Message: {message.content}</p>
                        <small>From: {message.fromUser.username}</small>
                      </div>
                    )
                  })
                }
              </section>
            </div>
          </>
      }
    </>
  )
}

export default Profile;