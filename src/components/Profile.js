import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchFromAPI } from '../api';
import { async } from 'q';
import MapPosts from './MapPosts';

const Profile = ({ token, setToken, fetchPosts }) => {
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
            <h1>My Profile</h1>

            <header className='profileHeader'>
              <h3 className='username'>{`User: ${profileData.username}`}</h3>
              <button
                className='logoutButton'
                type='button'
                onClick={logout}
              >Log Out
              </button>
            </header>

            <section className='myPosts'>
              <header className='myPostsHeader'>
                <h3>My Posts</h3>
                <button
                  className='newPostButton'
                  type='button'
                  onClick={() => history.push('/posts/new-post')}
                >Make New Post
                </button>
              </header>
              <MapPosts 
                posts={profileData.posts} 
                token={token} 
                areMyPosts={true} 
                fetchPosts={fetchPosts}
              />
            </section>

            <section className='messages' >
              <h3>My Messages</h3>
              {
                profileData.messages && profileData.messages.map((message, idx) => {
                  return (
                    <div key={message.id ?? idx}>
                      <h4>For {message.post.title}:</h4>
                      <p>{message.content}</p>
                      <small>From: {message.fromUser.username}</small>
                    </div> 
                  )
                })
              }
            </section>
          </>
      }
    </>
  )
}

export default Profile;