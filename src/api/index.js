import { async } from "q";

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';

const API_ENDPOINTS = {
  posts: '/posts',
  register: '/users/register',
  login: '/users/login'
}

export const fetchFromAPI = async (
  {body, endpoint, method}) => {
  try {
    const response = await fetch(
      BASE_URL + API_ENDPOINTS[endpoint], {
        method: method ? method.toUpperCase() : 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        ...(body && {body: JSON.stringify(body)})
      }
    );
    const result = await response.json();
    console.log(result);
    return result;
  }
  catch(err) {
    console.error(err);
  }
}