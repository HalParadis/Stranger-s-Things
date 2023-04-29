import React, { useState } from "react";
import { fetchFromAPI } from "../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { async } from "q";
import { Post } from ".";

const Posts = ({ posts, token, fetchPosts }) => {
  //const [message, setMessage] = useState('');
  const history = useHistory();

  return <>
    <h1>Posts</h1>
    {
      token && <button
        className='newPostButton'
        type='button'
        onClick={() => history.push('/posts/new-post')}
          >Make New Post
      </button>
    }
    {
      posts && posts.map((post, idx) => <Post 
        key={post._id ?? idx}
        post={post}  
        token={token} 
        fetchPosts={fetchPosts}
      />)
    }
  </>
}

export default Posts;