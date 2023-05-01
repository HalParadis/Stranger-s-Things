import React, { useState } from "react";
import { async } from "q";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";

import { fetchFromAPI } from "../api";
import { FormTextInput } from ".";

const PostForm = ({ token, fetchPosts, posts }) => {
  const history = useHistory();
  const params = useParams();

  const { actionType, id } = params;

  const isActionTypeEdit = actionType === 'edit-post';
  const post = posts.find(post => post._id == id);

  const [title, setTitle] = useState(isActionTypeEdit ? post.title : ''); 
  const [description, setDescription] = useState(isActionTypeEdit ? post.description : '');
  const [location, setLocation] = useState(isActionTypeEdit ? post.location : '');
  const [price, setPrice] = useState(isActionTypeEdit ? post.price : '');
  const [willDeliver, setWillDeliver] = useState(isActionTypeEdit ? post.willDeliver : false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (title && description && price) {
      const result = await fetchFromAPI({
        body: {
          post: {
            title,
            description,
            price,
            location,
            willDeliver
          }
        },
        method: isActionTypeEdit ? 'patch' : 'post',
        endpoint: `/posts${isActionTypeEdit ? '/' + id : ''}`,
        token
      });

      if (result.success) {
        fetchPosts();
        history.push('/posts');
      }
      else {
        setErrorMessage(result.error.message);
      }
    }
    else {
      setErrorMessage('Title, Description, and Price fields must be filled.')
    }
  }

  return (
    <>
      <h2 className='postFormHeader'>{isActionTypeEdit ? 'Edit Post' : 'Create Post'}</h2>
      <form className='postForm' onSubmit={handleSubmit} >
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <FormTextInput
          name={'title'}
          value={title}
          setValue={setTitle}
          required
        />

        <div className='postFormInput'>
          <label htmlFor='description'>Description: </label>
          <textarea
            name='description'
            rows='4'
            cols='40'
            value={description}
            onChange={event => setDescription(event.target.value)}
          />
        </div>

        <FormTextInput
          name={'price'}
          value={price}
          setValue={setPrice}
          required
        />

        <FormTextInput
          name={'location'}
          value={location}
          setValue={setLocation}
        />

        <div className='postFormCheckbox'>
          <label htmlFor='willDeliver' >Will Deliver: </label>
          <input name='willDeliver'
            type='checkbox'
            checked={willDeliver}
            onChange={() => setWillDeliver(!willDeliver)}
          />
        </div>

        <button className='postFormSubmit' type='submit'>Submit</button>
      </form>
    </>
  )
}

export default PostForm;