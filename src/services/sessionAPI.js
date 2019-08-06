import { post, remove } from './api';

/**
 * The method makes an API call that create a session on the https://flighter-hw7.herokuapp.com/api API. 
 * The session contains an authorization token which is used to make most of the other API calls.
 * @param {String} email 
 * @param {String} password 
 */
export function createSession(email, password) {
    const body = JSON.stringify({
        "session": {
          "email": email,
          "password": password
        }
      })
    return post('session', '', body);
  };

/**
 * The method makes an API call that deletes a session on the https://flighter-hw7.herokuapp.com/api API. 
 * 
 * @param {String} token User authorization token
 */
  export function deleteSession(token) {
    return remove('session', token, '');
  };
