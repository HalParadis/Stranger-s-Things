import React, { useState } from "react";
import { fetchFromAPI } from "../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { async } from "q";
import { Post } from ".";

const Posts = ({ posts, token, fetchPosts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const history = useHistory();

  const stringContainsTerm = (str) => {
    return str.toLowerCase().includes(searchTerm.trim().toLowerCase())
  }

  const postContainsTerm = (post) => {
    return stringContainsTerm(post.location)
      || stringContainsTerm(post.title)
      || stringContainsTerm(post.author.username)
      || stringContainsTerm(post.price)
      || stringContainsTerm(post.description)
  }

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
    <label htmlFor='searchTerm' >Search: </label>
        <input
          type='text'
          name='searchTerm'
          value={searchTerm}
          onChange={event => setSearchTerm(event.target.value)}
        />
    {
      posts && posts.filter(post => postContainsTerm(post)).map(
        (post, idx) => <Post 
          key={post._id ?? idx}
          post={post}  
          token={token} 
          fetchPosts={fetchPosts}
      />)
    }
  </>
}

export default Posts;