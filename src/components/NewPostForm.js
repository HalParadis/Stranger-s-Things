import React, { useState } from "react";
import { async } from "q";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { fetchFromAPI } from "../api";
import { FormTextInput } from ".";

const NewPostForm = ({ token, fetchPosts }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [willDeliver, setWillDeliver] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      method: 'post',
      endpoint: '/posts',
      token
    });

    if (result.success) {
      fetchPosts();
      history.push('/profile');
    }
    else {
      setErrorMessage(result.error.message);
    }
  }

  return (
    <>
      <h2 className='newPostHeader'>Create Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit} >
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <FormTextInput
          name={'title'}
          value={title}
          setValue={setTitle}
          required
        />

        {/* <FormTextInput
          name={'description'}
          value={description}
          setValue={setDescription}
          required
        /> */}

        <div className='newPostInput'>
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

        <div className='newPostCheckbox'>
          <label htmlFor='willDeliver' >Will Deliver: </label>
          <input name='willDeliver'
            type='checkbox'
            onChange={() => setWillDeliver(!willDeliver)}
          />
        </div>

        <button className='newPostSubmit' type='submit'>Submit</button>
      </form>
    </>
  )
}

export default NewPostForm;