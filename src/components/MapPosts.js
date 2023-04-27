import React from "react";

const MapPosts = ({ posts }) => {
  return <>
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
}

export default MapPosts;