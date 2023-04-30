import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchFromAPI } from './api';

import {
  Posts,
  Profile,
  ProfileForm,
  NewPostForm
} from './components';

const App = () => {
  const [token, setToken] = useState(null);
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const result = await fetchFromAPI({ 
      endpoint: '/posts',
      token
    });
    setPosts(result.data.posts);
  }

  useEffect(() => {
    fetchPosts();
  }, [token]);

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        {
          token
            ? <Link to='/profile'>My Profile</Link>
            : <Link to='/profile/login'>Log In</Link>
        }
      </nav>
      <Route exact path='/'>
        <h1>Stranger's Things</h1>
        <h2 className='welcome'>Welcome To Our Site</h2>

      </Route>
      <Route exact path='/posts'>
        <Posts posts={posts} token={token} fetchPosts={fetchPosts} />
      </Route>
      <Route path='/posts/new-post'>
        <NewPostForm token={token} fetchPosts={fetchPosts} />
      </Route>
      <Route exact path='/profile'>
        <Profile 
          token={token} 
          setToken={setToken} 
          fetchPosts={fetchPosts}
        />
      </Route>
      <Route path='/profile/:actionType'>
        <ProfileForm 
          token={token} 
          setToken={setToken} 
          fetchPosts={fetchPosts}
        />
      </Route>
    </>
  )
}

export default App;