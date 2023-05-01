import { async } from "q";

const BASE_URL = 'https://strangers-things.herokuapp.com/api/2301-FTB-PT-WEB-PT';

export const fetchFromAPI = async (
  {body, endpoint, method, token}) => {
  try {
    const response = await fetch(
      BASE_URL + endpoint, {
        method: method ? method.toUpperCase() : 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...(token && {'Authorization': `Bearer ${token}`})
        },
        ...(body && {body: JSON.stringify(body)})
      }
    );
    const result = await response.json();
    return result;
  }
  catch(err) {
    console.error(err);
  }
}