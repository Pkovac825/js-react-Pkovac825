import { get } from './api';

export function userRequest(method, email, fname, lname, password) {
    const optionsUser = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "user": {
          "email": email,
          "first_name": fname,
          "last_name": lname,
          "password": password
        }
      })

    };
    return get('users', optionsUser);
  }