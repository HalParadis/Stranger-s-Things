import React, { useState } from "react";
import { async } from "q";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

import { fetchFromAPI } from "../api";
import { FormTextInput } from ".";

const NewPostForm = ({token, fetchPosts}) => {
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
      //setErrorMessage(null);
      fetchPosts();
      history.push('/profile');
    }
    else {
      setErrorMessage(result.error.message);
    }
  }

  return (
    <>
      <h1>New Post</h1>
      <form className='newPostForm' onSubmit={handleSubmit} >
        {errorMessage && <p className='errorMessage'>{errorMessage}</p>}
        <FormTextInput name={'title'} value={title} setValue={setTitle} />

        <FormTextInput name={'description'} value={description} setValue={setDescription} />

        <FormTextInput name={'location'} value={location} setValue={setLocation} />

        <FormTextInput name={'price'} value={price} setValue={setPrice} />

        <div>
          <label htmlFor='willDeliver' >Will Deliver: </label>
          <input name='willDeliver'
            type='checkbox'
            onChange={() => setWillDeliver(!willDeliver)}
          />
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}

export default NewPostForm;