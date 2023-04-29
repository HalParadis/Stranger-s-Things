import React, { useState } from "react";
import { fetchFromAPI } from "../api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { async } from "q";

const MapPosts = ({ posts, token, fetchPosts }) => {
  const [message, setMessage] = useState('');
  const history = useHistory();

  return <>
    <button
      className='newPostButton'
      type='button'
      onClick={() => history.push('/posts/new-post')}
    >Make New Post
    </button>
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
            {/* {!active && <small className='inactive'>INACTIVE</small> } */}
            <h2>{title}</h2>
            <p>{description}</p>
            <h4>{'Price: ' + price}</h4>
            <h4>{'Location: ' + location}</h4>
            <h4>{`Will ${willDeliver ? '' : 'Not '}Deliver`}</h4>
            {author.username && <h4>{`Posted by: ${isAuthor ? 'Me' : author.username}`}</h4>}

            {/** Delete Button */}
            {
              isAuthor && active && <button
                type='button'
                onClick={async () => {
                  const result = await fetchFromAPI({
                    endpoint: `/posts/${_id}`,
                    method: 'delete',
                    token
                  });
                  if (result.success) fetchPosts();
                }}
              >Delete Post
              </button>
            }

            {/** Message Form */}
            {
              !isAuthor && token && <form
                className='messageForm'
                onSubmit={async (e) => {
                  e.preventDefault();
                  const result = fetchFromAPI({
                    endpoint: `/posts/${_id}/messages`,
                    method: 'post',
                    body: {
                      message: {
                        content: message
                      }
                    },
                    token
                  });
                  if (result.success) setMessage('');
                }}>
                <label htmlFor='message' >Send Message: </label>
                <input
                  type='text'
                  name='message'
                  value={message}
                  onChange={event => setMessage(event.target.value)}
                />
                <button type='submit'>Send</button>
              </form>
            }
          </div>
        )
      })
    }
  </>
}

export default MapPosts;