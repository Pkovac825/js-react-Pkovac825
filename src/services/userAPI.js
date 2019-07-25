import { post } from './api';

export function createUser(email, fname, lname, password) {
    const body = JSON.stringify({
        "user": {
          "email": email,
          "first_name": fname,
          "last_name": lname,
          "password": password
        }
      });

    return post('users', '', body);
  }