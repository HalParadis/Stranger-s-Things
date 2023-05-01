import React, { useState, useEffect } from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';

import { fetchFromAPI } from './api';

import {
  Posts,
  Profile,
  ProfileForm,
  PostForm
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
      <header className='siteHeader'>
        <h1>Stranger's Things</h1>
        <nav>
          <Link to='/' className='navLink'>Home</Link>
          <Link to='/posts' className='navLink'>Posts</Link>
          {
            token
              ? <Link to='/profile' className='navLink'>My Profile</Link>
              : <Link to='/profile/login' className='navLink'>Log In</Link>
          }
        </nav>
      </header>

      <Route exact path='/'>
        <h2 className='welcome'>Welcome To Our Site</h2>
      </Route>
      <Route exact path='/posts'>
        <Posts posts={posts} token={token} fetchPosts={fetchPosts} />
      </Route>
      <Route path='/posts/:actionType/:id'>
        <PostForm token={token} fetchPosts={fetchPosts} posts={posts} />
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