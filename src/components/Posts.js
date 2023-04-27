import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../api';
import { MapPosts } from '.';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';

const Posts = ({posts}) => {
  // const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   const result = await fetchFromAPI({endpoint: 'posts'});
  //   setPosts(result.data.posts);
  // }

  // useEffect(() => {
  //   fetchPosts();
  // }, []);

  return (
    <>
      <h1>Posts</h1>
      <MapPosts posts={posts}/>
    </>
  )
}

export default Posts;