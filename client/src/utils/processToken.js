import setAuthToken from './setAuthToken';
import jwt_decode from 'jwt-decode';

const processToken = (token) => {
  return new Promise((resolve, reject) => {
    // Set token to localStorage
    localStorage.setItem('jwtToken', token);

    // Set token to Auth header
    setAuthToken(token);

    // Decode token to get user data
    const decoded = jwt_decode(token);
    resolve(decoded);
  });
};

export default processToken;
