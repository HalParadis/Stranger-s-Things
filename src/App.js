import React, { useState } from 'react';
import { Route, Link } from 'react-router-dom/cjs/react-router-dom.min';

import {
  Posts,
  ProfileForm
} from './components';

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/posts'>Posts</Link>
        <Link to='/profile/login'>Log In</Link>
      </nav>
      <Route exact path='/'>
        <h1>Stranger's Things</h1>
      </Route>
      <Route path='/posts'>
        <Posts />
      </Route>
      <Route path='/profile/:actionType'>
        <ProfileForm setToken={setToken} />
      </Route>
    </>
  )
}

export default App;