import { async } from 'q';
import React, { useEffect, useState } from 'react';
import { fetchFromAPI } from '../api';

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  // const fetchPosts = async () => {
  //   try {
  //     const response = await fetch(BASE_URL + '/posts');
  //     const results = await response.json();
  //     console.log(results);
  //     setPosts(results.data.posts);
  //   }
  //   catch(err) {
  //     console.error(err);
  //   }
  // }

  const fetchPosts = async () => {
    const result = await fetchFromAPI({endpoint: 'posts'});
    setPosts(result.data.posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <>
      <h1>Posts</h1>
      {
        posts && posts.map(({
          _id,
          title,
          description,
          price,
          location,
          willDeliver
          }, idx) => {
            return (
            <div key={_id ?? idx} className='post'>
              <h2>{title}</h2>
              <p>{description}</p>
              <h4>{'Price: ' + price}</h4>
              <h4>{'Location: ' + location}</h4>
              <h4>{`Will ${willDeliver ? '' : 'Not '}Deliver`}</h4>
            </div>
            )
          })
      }
    </>
  )
}

export default Posts;