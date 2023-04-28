import React from "react";
import { fetchFromAPI } from "../api";

const MapPosts = ({ posts, token, areMyPosts, fetchPosts }) => {
  return <>
    {
      posts && posts.map(({
        _id,
        title,
        description,
        price,
        location,
        willDeliver,
        author,
        isAuthor,
        active
      }, idx) => {
        return (
          <div key={_id ?? idx} className='post'>
            {!active && <small className='inactive'>INACTIVE</small> }
            <h2>{title}</h2>
            <p>{description}</p>
            <h4>{'Price: ' + price}</h4>
            <h4>{'Location: ' + location}</h4>
            <h4>{`Will ${willDeliver ? '' : 'Not '}Deliver`}</h4>
            {author.username && <h4>{`Posted by: ${isAuthor ? 'Me' : author.username}`}</h4>}
            {
              (isAuthor || areMyPosts) && active && <button 
                type='button' 
                onClick={() => {
                  fetchFromAPI({
                    endpoint: `/posts/${_id}`,
                    method: 'delete',
                    token
                  });
                  fetchPosts();
                }}
                  >Delete Post
              </button>
            }
          </div>
        )
      })
    }
  </>
}

export default MapPosts;