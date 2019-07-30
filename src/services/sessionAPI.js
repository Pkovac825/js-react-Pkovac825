import { post, remove } from './api';

export function createSession(email, password) {
    const body = JSON.stringify({
        "session": {
          "email": email,
          "password": password
        }
      })
    return post('session', '', body);
  };


  export function deleteSession(token) {
    return remove('session', token, '');
  };
